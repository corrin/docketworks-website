/**
 * The live-demo lead-capture form (Preact island).
 *
 * Phase A: this is a non-interactive placeholder so /demo renders. Phase C wires
 * it up — controlled fields + honeypot, client-side validation, submit states,
 * and on success it shows the shared-demo URL + login returned by
 * POST /api/demo/shared (also emailed to the visitor).
 */
export default function DemoForm() {
  return (
    <div class="rounded-xl border border-dashed border-primary-300 bg-primary-50 p-6 text-sm text-primary-500">
      <p class="font-semibold text-primary-700">[ demo form — coming in build phase C ]</p>
      <p class="mt-2">
        Will collect: name, business name, team size, what you use now, email — and
        on submit show you (and email you) the live demo's address and login.
      </p>
    </div>
  );
}
