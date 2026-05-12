/**
 * The live-demo lead-capture form (Preact island).
 *
 * Collects name / business / team size / what-you-use-now / email (+ a hidden
 * honeypot), POSTs to /api/demo/shared, and on success shows the shared-demo
 * address + login returned by the endpoint (also emailed to the visitor).
 */
import { useState } from 'preact/hooks';
import type { JSX } from 'preact';

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

interface Fields {
  name: string;
  businessName: string;
  teamSize: string;
  currentTool: string;
  email: string;
  website: string; // honeypot
}

interface Success {
  url: string;
  username: string;
  password: string;
  /** present when the email send failed but we still got the login */
  warning?: string;
  operatorEmail?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY: Fields = {
  name: '',
  businessName: '',
  teamSize: '',
  currentTool: '',
  email: '',
  website: '',
};

function clientValidate(f: Fields): { field: keyof Fields; message: string } | null {
  if (!f.name.trim()) return { field: 'name', message: 'Your name, please.' };
  if (!f.businessName.trim())
    return { field: 'businessName', message: "Your business's name, please." };
  if (!EMAIL_RE.test(f.email.trim())) return { field: 'email', message: 'That email doesn’t look right.' };
  if (!f.teamSize.trim()) return { field: 'teamSize', message: 'Roughly how many staff?' };
  if (!f.currentTool.trim()) return { field: 'currentTool', message: 'What do you run jobs on now?' };
  return null;
}

export default function DemoForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [errField, setErrField] = useState<keyof Fields | null>(null);
  const [errMsg, setErrMsg] = useState<string>('');
  const [result, setResult] = useState<Success | null>(null);

  const set = (k: keyof Fields) => (e: JSX.TargetedEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFields({ ...fields, [k]: (e.currentTarget as HTMLInputElement).value });
  };

  const onSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = clientValidate(fields);
    if (v) {
      setErrField(v.field);
      setErrMsg(v.message);
      setStatus('error');
      return;
    }
    setErrField(null);
    setErrMsg('');
    setStatus('pending');
    try {
      const res = await fetch('/api/demo/shared', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      if (res.ok && data.ok) {
        if (typeof data.url === 'string') {
          setResult({
            url: data.url,
            username: String(data.username ?? ''),
            password: String(data.password ?? ''),
          });
        }
        setStatus('success');
        return;
      }
      // 502 with creds: email failed, but we have the login
      if (typeof data.url === 'string') {
        setResult({
          url: data.url,
          username: String(data.username ?? ''),
          password: String(data.password ?? ''),
          warning: typeof data.error === 'string' ? data.error : undefined,
          operatorEmail: typeof data.operatorEmail === 'string' ? data.operatorEmail : undefined,
        });
        setStatus('success');
        return;
      }
      setErrField((data.field as keyof Fields) ?? null);
      setErrMsg(typeof data.error === 'string' ? data.error : 'Something went wrong — try again.');
      setStatus('error');
    } catch {
      setStatus('error');
      setErrMsg('Couldn’t reach us just now — try again in a moment.');
      setErrField(null);
    }
  };

  if (status === 'success' && result) {
    return (
      <div class="rounded-xl border border-primary-200 bg-white p-6">
        <p class="text-lg font-semibold text-primary-900">Here it is — also in your inbox.</p>
        <dl class="mt-4 space-y-2 text-sm">
          <div class="flex gap-2">
            <dt class="w-24 flex-none text-primary-500">Address</dt>
            <dd><a href={result.url} class="font-medium text-accent-700 hover:text-accent-800 break-all">{result.url}</a></dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-24 flex-none text-primary-500">Username</dt>
            <dd class="font-medium text-primary-900">{result.username}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-24 flex-none text-primary-500">Password</dt>
            <dd class="font-medium text-primary-900">{result.password}</dd>
          </div>
        </dl>
        {result.warning && (
          <p class="mt-4 text-sm text-primary-600">
            {result.warning}
            {result.operatorEmail && (
              <> <a href={`mailto:${result.operatorEmail}`} class="text-accent-700 hover:text-accent-800">{result.operatorEmail}</a></>
            )}
          </p>
        )}
        <p class="mt-4 text-sm text-primary-500">Have a poke around — nothing you do in there matters.</p>
      </div>
    );
  }

  const fieldErr = (f: keyof Fields) => (status === 'error' && errField === f ? errMsg : '');

  return (
    <form onSubmit={onSubmit} noValidate class="space-y-4">
      <Field label="Your name" name="name" value={fields.name} onInput={set('name')} error={fieldErr('name')} autocomplete="name" />
      <Field label="Business name" name="businessName" value={fields.businessName} onInput={set('businessName')} error={fieldErr('businessName')} autocomplete="organization" />
      <Field label="Team size" name="teamSize" value={fields.teamSize} onInput={set('teamSize')} error={fieldErr('teamSize')} placeholder="e.g. 15" inputMode="numeric" />
      <Field label="What you run jobs on now" name="currentTool" value={fields.currentTool} onInput={set('currentTool')} error={fieldErr('currentTool')} placeholder="whiteboard, a spreadsheet, Trello…" />
      <Field label="Email" name="email" type="email" value={fields.email} onInput={set('email')} error={fieldErr('email')} autocomplete="email" />

      {/* honeypot — visually hidden, real users won't touch it */}
      <div aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autocomplete="off" value={fields.website} onInput={set('website')} /></label>
      </div>

      {status === 'error' && !errField && (
        <p class="text-sm text-red-600">{errMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'pending'}
        class="inline-flex items-center justify-center rounded-lg bg-accent-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'pending' ? 'Sending…' : 'Show me the demo'}
      </button>
      <p class="text-xs text-primary-400">No call, no pitch. We email you the login and use your details only to get back to you about DocketWorks.</p>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onInput: (e: JSX.TargetedEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autocomplete?: string;
  inputMode?: JSX.HTMLAttributes<HTMLInputElement>['inputMode'];
}

function Field({ label, name, value, onInput, error, type = 'text', placeholder, autocomplete, inputMode }: FieldProps) {
  return (
    <div>
      <label for={`f-${name}`} class="block text-sm font-medium text-primary-700">{label}</label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        value={value}
        onInput={onInput}
        placeholder={placeholder}
        autocomplete={autocomplete}
        inputMode={inputMode}
        aria-invalid={error ? 'true' : undefined}
        class={cx(
          'mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-base text-primary-900 outline-none focus:ring-2 focus:ring-accent-500',
          error ? 'border-red-400' : 'border-primary-300',
        )}
      />
      {error && <p class="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
