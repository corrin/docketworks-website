import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { sendEmail } from '../src/lib/email';
import { _resetEnvCache } from '../src/lib/env';

const REAL_ENV = {
  OPERATOR_EMAIL: 'ops@test.example',
  EMAIL_API_KEY: 'secret-key',
  EMAIL_FROM: 'from@test.example',
  SHARED_DEMO_URL: 'https://demo.test/x',
  SHARED_DEMO_USERNAME: 'u',
  SHARED_DEMO_PASSWORD: 'p',
  SCHEDULER_EMBED_URL: 'https://cal.test/x',
};

function setRealEnv(provider: 'resend' | 'postmark') {
  for (const [k, v] of Object.entries(REAL_ENV)) process.env[k] = v;
  process.env.EMAIL_PROVIDER = provider;
  _resetEnvCache();
}

function clearEmailEnv() {
  for (const k of Object.keys(REAL_ENV)) delete process.env[k];
  delete process.env.EMAIL_PROVIDER;
  _resetEnvCache();
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

afterEach(() => {
  clearEmailEnv();
  vi.unstubAllGlobals();
});

describe('sendEmail', () => {
  it('placeholder config: logs, does not hit the network', async () => {
    clearEmailEnv(); // nothing set → isPlaceholder
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await expect(sendEmail({ to: 'x@y.z', subject: 'hi', text: 'body' })).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalled();
  });

  it('resend: POSTs to the Resend API with a Bearer token', async () => {
    setRealEnv('resend');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await sendEmail({ to: 'x@y.z', subject: 'hi', text: 'body' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer secret-key');
    expect(JSON.parse(init.body as string)).toMatchObject({ from: 'from@test.example', to: 'x@y.z' });
  });

  it('postmark: POSTs to the Postmark API with the server token header', async () => {
    setRealEnv('postmark');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await sendEmail({ to: 'x@y.z', subject: 'hi', text: 'body' });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.postmarkapp.com/email');
    expect((init.headers as Record<string, string>)['X-Postmark-Server-Token']).toBe('secret-key');
    expect(JSON.parse(init.body as string)).toMatchObject({ From: 'from@test.example', To: 'x@y.z' });
  });

  it('throws when the provider responds non-2xx', async () => {
    setRealEnv('resend');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500, text: async () => 'kaboom' } as unknown as Response),
    );
    await expect(sendEmail({ to: 'x@y.z', subject: 'hi', text: 'body' })).rejects.toThrow(/Resend send failed: 500/);
  });
});
