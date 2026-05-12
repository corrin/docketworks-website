/**
 * POST /api/demo/shared — the live-demo lead-capture form.
 *
 * Validates → (honeypot? silently drop) → email the operator the lead +
 * email the visitor the shared-demo login → respond with the login so the page
 * can show it immediately. Email failure still returns the login (it doesn't
 * depend on email having worked).
 */
import type { APIRoute } from 'astro';
import { getEnv } from '../../../lib/env';
import { notifyOperator, sendDemoCreds, type DemoLead } from '../../../lib/email';

export const prerender = false;

interface ParsedBody {
  name: string;
  businessName: string;
  teamSize: string;
  currentTool: string;
  email: string;
  /** Honeypot — real users never fill this. */
  website: string;
}

interface FieldError {
  field: keyof ParsedBody;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, in-memory, per-IP rate limit. Naive on purpose.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

/** Test-only. */
export function _resetRateLimit(): void {
  hits.clear();
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim();
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function validate(raw: unknown): { body: ParsedBody } | { error: FieldError } {
  if (typeof raw !== 'object' || raw === null) {
    return { error: { field: 'name', message: "We couldn't read that — try again." } };
  }
  const r = raw as Record<string, unknown>;
  const body: ParsedBody = {
    name: str(r.name),
    businessName: str(r.businessName),
    teamSize: str(r.teamSize),
    currentTool: str(r.currentTool),
    email: str(r.email),
    website: str(r.website),
  };
  if (!body.name) return { error: { field: 'name', message: 'Your name, please.' } };
  if (!body.businessName)
    return { error: { field: 'businessName', message: "Your business's name, please." } };
  if (!body.email || !EMAIL_RE.test(body.email))
    return { error: { field: 'email', message: 'That email doesn’t look right.' } };
  if (!body.teamSize) return { error: { field: 'teamSize', message: 'Roughly how many staff?' } };
  if (!body.currentTool)
    return { error: { field: 'currentTool', message: 'What do you run jobs on now?' } };
  return { body };
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "We couldn't read that — try again." }, 400);
  }

  const result = validate(raw);
  if ('error' in result) {
    return json({ ok: false, error: result.error.message, field: result.error.field }, 400);
  }
  const body = result.body;

  // Honeypot: pretend it worked, drop it on the floor.
  if (body.website) {
    return json({ ok: true }, 200);
  }

  const ip = clientAddress || 'unknown';
  if (rateLimited(ip)) {
    return json({ ok: false, error: 'Too many requests just now — try again in a bit.' }, 429);
  }

  const env = getEnv();
  const creds = {
    url: env.sharedDemoUrl,
    username: env.sharedDemoUsername,
    password: env.sharedDemoPassword,
  };
  const lead: DemoLead = {
    name: body.name,
    businessName: body.businessName,
    teamSize: body.teamSize,
    currentTool: body.currentTool,
    email: body.email,
  };

  try {
    await notifyOperator(lead);
    await sendDemoCreds(body.email, creds);
  } catch (err) {
    console.error('[api/demo/shared] email send failed:', err);
    // The creds don't depend on email — still hand them back.
    return json(
      {
        ok: false,
        error: "We couldn't email it just now — but here's the login. Try again, or email us directly.",
        operatorEmail: env.operatorEmail,
        ...creds,
      },
      502,
    );
  }

  return json({ ok: true, ...creds }, 200);
};
