import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../src/lib/email');

import { POST, _resetRateLimit } from '../src/pages/api/demo/shared';
import { _resetEnvCache } from '../src/lib/env';
import { notifyOperator, sendDemoCreds } from '../src/lib/email';

const ENV = {
  url: 'https://demo.test/x',
  username: 'tuser',
  password: 'tpass',
  operator: 'ops@test.example',
};

function mkCtx(body: unknown, ip = '1.2.3.4', { rawBody }: { rawBody?: string } = {}) {
  const request = new Request('http://localhost/api/demo/shared', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: rawBody ?? JSON.stringify(body),
  });
  return { request, clientAddress: ip } as never;
}

const validBody = {
  name: 'Dan',
  businessName: 'DanMade',
  teamSize: '15',
  currentTool: 'Trello',
  email: 'dan@example.com',
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(notifyOperator).mockResolvedValue(undefined);
  vi.mocked(sendDemoCreds).mockResolvedValue(undefined);
  process.env.SHARED_DEMO_URL = ENV.url;
  process.env.SHARED_DEMO_USERNAME = ENV.username;
  process.env.SHARED_DEMO_PASSWORD = ENV.password;
  process.env.OPERATOR_EMAIL = ENV.operator;
  process.env.EMAIL_PROVIDER = 'resend';
  process.env.EMAIL_API_KEY = 'k';
  process.env.EMAIL_FROM = 'from@test.example';
  _resetEnvCache();
  _resetRateLimit();
});

describe('POST /api/demo/shared', () => {
  it('valid input → 200 with the shared-demo login, and emails both parties', async () => {
    const res = await POST(mkCtx(validBody));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toMatchObject({ ok: true, url: ENV.url, username: ENV.username, password: ENV.password });

    expect(notifyOperator).toHaveBeenCalledTimes(1);
    expect(notifyOperator).toHaveBeenCalledWith({
      name: 'Dan',
      businessName: 'DanMade',
      teamSize: '15',
      currentTool: 'Trello',
      email: 'dan@example.com',
    });
    expect(sendDemoCreds).toHaveBeenCalledTimes(1);
    expect(sendDemoCreds).toHaveBeenCalledWith('dan@example.com', {
      url: ENV.url,
      username: ENV.username,
      password: ENV.password,
    });
  });

  it('missing name → 400 naming the field, no email sent', async () => {
    const res = await POST(mkCtx({ ...validBody, name: '' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.field).toBe('name');
    expect(notifyOperator).not.toHaveBeenCalled();
    expect(sendDemoCreds).not.toHaveBeenCalled();
  });

  it('malformed email → 400 on the email field', async () => {
    const res = await POST(mkCtx({ ...validBody, email: 'not-an-email' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.field).toBe('email');
    expect(notifyOperator).not.toHaveBeenCalled();
  });

  it('invalid JSON → 400', async () => {
    const res = await POST(mkCtx(undefined, '1.2.3.4', { rawBody: '{ not json' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
  });

  it('honeypot filled → 200 fake-success, nothing emailed', async () => {
    const res = await POST(mkCtx({ ...validBody, website: 'http://spam.example' }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ ok: true });
    expect(data.url).toBeUndefined();
    expect(notifyOperator).not.toHaveBeenCalled();
    expect(sendDemoCreds).not.toHaveBeenCalled();
  });

  it('email send fails → 502, but the login is still returned', async () => {
    vi.mocked(notifyOperator).mockRejectedValueOnce(new Error('provider down'));
    const res = await POST(mkCtx(validBody));
    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.url).toBe(ENV.url);
    expect(data.username).toBe(ENV.username);
    expect(data.password).toBe(ENV.password);
    expect(data.operatorEmail).toBe(ENV.operator);
  });

  it('too many requests from one IP → 429', async () => {
    for (let i = 0; i < 5; i++) {
      const ok = await POST(mkCtx(validBody, '9.9.9.9'));
      expect(ok.status).toBe(200);
    }
    const res = await POST(mkCtx(validBody, '9.9.9.9'));
    expect(res.status).toBe(429);
  });
});
