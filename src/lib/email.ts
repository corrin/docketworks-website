/**
 * Transactional email — sends via the operator's Microsoft 365 mailbox over
 * SMTP (smtp.office365.com:587, STARTTLS, app-password auth). When config is
 * missing (dev / build with no real `.env`), it logs the email instead of
 * sending and returns — so the site runs and tests don't touch the network.
 *
 * NEVER import this from client code.
 */
import nodemailer, { type Transporter } from 'nodemailer';
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

let cachedTransport: Transporter | null = null;

function getTransport(): Transporter {
  if (cachedTransport) return cachedTransport;
  const env = getEnv();
  cachedTransport = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user: env.smtpUser, pass: env.smtpPassword },
  });
  return cachedTransport;
}

/** Test-only: clear the memoised transport so a fresh env is read. */
export function _resetTransportCache(): void {
  cachedTransport = null;
}

/** Send one email. Throws on failure (transport / auth / SMTP-level error). */
export async function sendEmail(msg: OutgoingEmail): Promise<void> {
  const env = getEnv();

  if (env.isPlaceholder) {
    console.log(
      `[email] (placeholder config — not sent) to=${msg.to} subject=${JSON.stringify(msg.subject)}`,
    );
    return;
  }

  await getTransport().sendMail({
    from: env.emailFrom,
    to: msg.to,
    subject: msg.subject,
    text: msg.text,
    html: msg.html,
  });
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
