export type ContactPayload =
  | {
      kind: "school";
      name: string;
      school: string;
      position: string;
      email: string;
      phone?: string;
      modules: string[];
      message?: string;
    }
  | {
      kind: "personal";
      name: string;
      email: string;
      plan: string;
      message?: string;
    };

export type ContactResult = { ok: true; reference: string } | { ok: false; error: string };

/**
 * Service boundary for contact / interest forms.
 * Today: validates + persists locally (demo).
 * Later: replace the body with a fetch() to your backend / CRM endpoint.
 *
 * Example future implementation:
 *   const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) });
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  if (payload.kind === "school") {
    if (!payload.name.trim() || !payload.school.trim() || !payload.email.trim()) {
      return { ok: false, error: "missing-fields" };
    }
  } else {
    if (!payload.name.trim() || !payload.email.trim()) {
      return { ok: false, error: "missing-fields" };
    }
  }
  if (!/[^@\s]+@[^@\s]+\.[^@\s]+/.test(payload.email)) {
    return { ok: false, error: "invalid-email" };
  }

  // Simulate network latency without any real backend.
  await new Promise((r) => setTimeout(r, 600));

  try {
    const key = "nexus-learn-interest";
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
    existing.push({ ...payload, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    /* storage optional */
  }

  return { ok: true, reference: `NX-${Date.now().toString(36).toUpperCase()}` };
}
