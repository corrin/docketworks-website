import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const { sendMailMock, createTransportMock } = vi.hoisted(() => {
  const sendMailMock = vi.fn();
  const createTransportMock = vi.fn(() => ({ sendMail: sendMailMock }));
  return { sendMailMock, createTransportMock };
});

vi.mock('nodemailer', () => ({
  default: { createTransport: createTransportMock },
}));

import { sendEmail, _resetTransportCache } from '../src/lib/email';
import { _resetEnvCache } from '../src/lib/env';

const REAL_ENV = {
  OPERATOR_EMAIL: 'ops@test.example',
  SMTP_USER: 'ops@test.example',
  SMTP_PASSWORD: 'app-password',
  EMAIL_FROM: 'ops@test.example',
  SHARED_DEMO_URL: 'https://demo.test/x',
  SHARED_DEMO_USERNAME: 'u',
  SHARED_DEMO_PASSWORD: 'p',
  SCHEDULER_EMBED_URL: 'https://cal.test/x',
};

function setRealEnv() {
  for (const [k, v] of Object.entries(REAL_ENV)) process.env[k] = v;
  _resetEnvCache();
  _resetTransportCache();
}

function clearEmailEnv() {
  for (const k of Object.keys(REAL_ENV)) delete process.env[k];
  _resetEnvCache();
  _resetTransportCache();
}

beforeEach(() => {
  sendMailMock.mockReset();
  createTransportMock.mockClear();
  sendMailMock.mockResolvedValue({});
});

afterEach(() => {
  clearEmailEnv();
});

describe('sendEmail', () => {
  it('placeholder config: logs, does not hit the network', async () => {
    clearEmailEnv(); // nothing set → isPlaceholder
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await expect(sendEmail({ to: 'x@y.z', subject: 'hi', text: 'body' })).resolves.toBeUndefined();
    expect(sendMailMock).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalled();
  });

  it('o365 SMTP: creates a transport with smtp.office365.com:587 + STARTTLS and sends', async () => {
    setRealEnv();

    await sendEmail({ to: 'x@y.z', subject: 'hi', text: 'body', html: '<p>body</p>' });

    expect(createTransportMock).toHaveBeenCalledTimes(1);
    expect(createTransportMock).toHaveBeenCalledWith({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user: 'ops@test.example', pass: 'app-password' },
    });

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'ops@test.example',
      to: 'x@y.z',
      subject: 'hi',
      text: 'body',
      html: '<p>body</p>',
    });
  });

  it('reuses a single transport across multiple sends', async () => {
    setRealEnv();
    await sendEmail({ to: 'a@y.z', subject: 's1', text: 'b1' });
    await sendEmail({ to: 'b@y.z', subject: 's2', text: 'b2' });

    expect(createTransportMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledTimes(2);
  });

  it('throws when the SMTP transport rejects', async () => {
    setRealEnv();
    sendMailMock.mockRejectedValueOnce(new Error('5.7.60 Client does not have permissions'));
    await expect(
      sendEmail({ to: 'x@y.z', subject: 'hi', text: 'body' }),
    ).rejects.toThrow(/5\.7\.60/);
  });
});
