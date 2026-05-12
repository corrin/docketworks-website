/**
 * Transactional email — provider-agnostic.
 *
 * One `sendEmail()`; behind it a switch on `EMAIL_PROVIDER` (resend | postmark)
 * hitting the provider's REST API via `fetch` (no SDK). When config is missing
 * (dev / build with no real `.env`), it logs the email instead of sending and
 * returns — so the site runs and tests don't touch the network.
 *
 * NEVER import this from client code.
 */
import { getEnv } from './env';

export interface OutgoingEmail {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface DemoLead {
  name: string;
  businessName: string;
  teamSize: string;
  currentTool: string;
  email: string;
}

export interface DemoCreds {
  url: string;
  username: string;
  password: string;
}

/** Send one email. Throws on failure (non-2xx from the provider). */
export async function sendEmail(msg: OutgoingEmail): Promise<void> {
  const env = getEnv();

  if (env.isPlaceholder) {
    console.log(
      `[email] (placeholder config — not sent) to=${msg.to} subject=${JSON.stringify(msg.subject)}`,
    );
    return;
  }

  if (env.emailProvider === 'postmark') {
    const res = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Postmark-Server-Token': env.emailApiKey,
      },
      body: JSON.stringify({
        From: env.emailFrom,
        To: msg.to,
        Subject: msg.subject,
        TextBody: msg.text,
        HtmlBody: msg.html,
        MessageStream: 'outbound',
      }),
    });
    if (!res.ok) {
      throw new Error(`Postmark send failed: ${res.status} ${await safeBody(res)}`);
    }
    return;
  }

  // default: resend
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.emailApiKey}`,
    },
    body: JSON.stringify({
      from: env.emailFrom,
      to: msg.to,
      subject: msg.subject,
      text: msg.text,
      html: msg.html,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend send failed: ${res.status} ${await safeBody(res)}`);
  }
}

async function safeBody(res: Response): Promise<string> {
  try {
    return (await res.text()).slice(0, 500);
  } catch {
    return '(no body)';
  }
}

/** Tell the operator a new lead came in via the live-demo form. */
export async function notifyOperator(lead: DemoLead): Promise<void> {
  const env = getEnv();
  const lines = [
    'New live-demo request from the website:',
    '',
    `Name:        ${lead.name}`,
    `Business:    ${lead.businessName}`,
    `Team size:   ${lead.teamSize}`,
    `Uses now:    ${lead.currentTool}`,
    `Email:       ${lead.email}`,
    '',
    `They've been shown / emailed the shared demo login (${env.sharedDemoUrl}).`,
  ];
  await sendEmail({
    to: env.operatorEmail,
    subject: `DocketWorks demo request — ${lead.businessName}`,
    text: lines.join('\n'),
  });
}

/** Email the visitor the shared-demo address and login. */
export async function sendDemoCreds(to: string, creds: DemoCreds): Promise<void> {
  const env = getEnv();
  const lines = [
    "Here's the DocketWorks live demo — a real, working system with a shop's",
    'worth of sample data in it. Have a poke around; nothing you do in there',
    'matters.',
    '',
    `Address:   ${creds.url}`,
    `Username:  ${creds.username}`,
    `Password:  ${creds.password}`,
    '',
    "When you're ready to talk, just reply to this email.",
    '',
    `— ${env.operatorEmail}`,
  ];
  await sendEmail({
    to,
    subject: 'Your DocketWorks demo login',
    text: lines.join('\n'),
  });
}
