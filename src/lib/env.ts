/**
 * Server-side configuration. Read from `process.env`. NEVER import this from
 * client code.
 *
 * `dotenv/config` is imported for its side-effect: at module load it reads
 * `${cwd}/.env` and populates `process.env`. Astro/Vite only exposes .env to
 * `import.meta.env` (compile-time), not to `process.env` (runtime), so we
 * load it ourselves. Works the same in dev (`astro dev`), tests (vitest), and
 * prod (the pm2-spawned `dist/server/entry.mjs`, whose cwd is the deploy dir).
 *
 * `getEnv()` never throws — anything not set falls back to an obvious
 * placeholder and `isPlaceholder` is `true`. That keeps it safe to call from
 * prerendered pages at build time. In production, set every variable in
 * `.env.example`; code paths that genuinely need a real value (the email send)
 * check `isPlaceholder` themselves. See `.env.example`.
 */
import 'dotenv/config';


export interface AppEnv {
  /** Where lead notifications go, and the "email us directly" address on errors. */
  operatorEmail: string;
  /** O365 mailbox address used as the SMTP AUTH username. */
  smtpUser: string;
  /** App password generated in the M365 account for that mailbox. */
  smtpPassword: string;
  /** From-address for outgoing mail. For O365 this normally equals smtpUser. */
  emailFrom: string;
  /** The always-on shared demo site. */
  sharedDemoUrl: string;
  sharedDemoUsername: string;
  sharedDemoPassword: string;
  /** Embed/link for the call-booking scheduler (Cal.com or Calendly). */
  schedulerEmbedUrl: string;
  /** True when we're running with placeholder values (dev, no real .env). */
  isPlaceholder: boolean;
}

const PLACEHOLDERS = {
  operatorEmail: 'hello@docketworks.site.PLACEHOLDER',
  smtpUser: 'hello@docketworks.site.PLACEHOLDER',
  smtpPassword: 'PLACEHOLDER',
  emailFrom: 'hello@docketworks.site.PLACEHOLDER',
  sharedDemoUrl: 'https://demo.docketworks.site/PLACEHOLDER',
  sharedDemoUsername: 'demo',
  sharedDemoPassword: 'demo',
  schedulerEmbedUrl: 'https://cal.com/PLACEHOLDER',
};

let cached: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cached) return cached;

  const pick = (key: string, fallback: string): { value: string; missing: boolean } => {
    const v = process.env[key];
    if (v && v.trim() !== '') return { value: v.trim(), missing: false };
    return { value: fallback, missing: true };
  };

  const fields: Array<[keyof typeof PLACEHOLDERS, string]> = [
    ['operatorEmail', 'OPERATOR_EMAIL'],
    ['smtpUser', 'SMTP_USER'],
    ['smtpPassword', 'SMTP_PASSWORD'],
    ['emailFrom', 'EMAIL_FROM'],
    ['sharedDemoUrl', 'SHARED_DEMO_URL'],
    ['sharedDemoUsername', 'SHARED_DEMO_USERNAME'],
    ['sharedDemoPassword', 'SHARED_DEMO_PASSWORD'],
    ['schedulerEmbedUrl', 'SCHEDULER_EMBED_URL'],
  ];

  const resolved: Record<string, string> = {};
  const missing: string[] = [];
  for (const [field, envKey] of fields) {
    const { value, missing: isMissing } = pick(envKey, PLACEHOLDERS[field] as string);
    resolved[field] = value;
    if (isMissing) missing.push(envKey);
  }

  cached = {
    operatorEmail: resolved.operatorEmail,
    smtpUser: resolved.smtpUser,
    smtpPassword: resolved.smtpPassword,
    emailFrom: resolved.emailFrom,
    sharedDemoUrl: resolved.sharedDemoUrl,
    sharedDemoUsername: resolved.sharedDemoUsername,
    sharedDemoPassword: resolved.sharedDemoPassword,
    schedulerEmbedUrl: resolved.schedulerEmbedUrl,
    isPlaceholder: missing.length > 0,
  };
  return cached;
}

/** Test-only: clear the memoised env so a fresh `process.env` is read. */
export function _resetEnvCache(): void {
  cached = null;
}
