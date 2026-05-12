/**
 * Server-side configuration. Read from `process.env` (the Node adapter exposes
 * runtime env vars there). NEVER import this from client code.
 *
 * In production every value below must be set — `getEnv()` throws if one is
 * missing. In dev, missing values fall back to obvious placeholders so the site
 * runs without a real `.env` (forms log instead of sending, the demo link is a
 * dummy, etc.). See `.env.example`.
 */

export interface AppEnv {
  /** Where lead notifications go, and the "email us directly" address on errors. */
  operatorEmail: string;
  /** Transactional email provider. */
  emailProvider: 'resend' | 'postmark';
  /** API key for the chosen provider. */
  emailApiKey: string;
  /** From-address for outgoing mail (operator notifications + visitor creds). */
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
  emailProvider: 'resend' as const,
  emailApiKey: 'PLACEHOLDER',
  emailFrom: 'hello@docketworks.site.PLACEHOLDER',
  sharedDemoUrl: 'https://demo.docketworks.site/PLACEHOLDER',
  sharedDemoUsername: 'demo',
  sharedDemoPassword: 'demo',
  schedulerEmbedUrl: 'https://cal.com/PLACEHOLDER',
};

let cached: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cached) return cached;

  const isProd = process.env.NODE_ENV === 'production';
  const pick = (key: string, fallback: string): { value: string; missing: boolean } => {
    const v = process.env[key];
    if (v && v.trim() !== '') return { value: v.trim(), missing: false };
    return { value: fallback, missing: true };
  };

  const fields: Array<[keyof typeof PLACEHOLDERS, string]> = [
    ['operatorEmail', 'OPERATOR_EMAIL'],
    ['emailProvider', 'EMAIL_PROVIDER'],
    ['emailApiKey', 'EMAIL_API_KEY'],
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

  if (isProd && missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        `See .env.example.`,
    );
  }

  const provider = resolved.emailProvider === 'postmark' ? 'postmark' : 'resend';

  cached = {
    operatorEmail: resolved.operatorEmail,
    emailProvider: provider,
    emailApiKey: resolved.emailApiKey,
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
