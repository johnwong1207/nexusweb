"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { submitContact } from "@/lib/contact-service";
import { Reveal } from "./Reveal";

const MODULES = ["Copilot", "Assessment", "Classroom", "FAB / STEM", "Analytics", "Notices"];

export function Contact() {
  const { t, lang } = useLanguage();
  const [mode, setMode] = useState<"school" | "personal">("school");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modules, setModules] = useState<string[]>(["Copilot"]);

  async function onSchool(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await submitContact({
      kind: "school",
      name: String(fd.get("name") ?? ""),
      school: String(fd.get("school") ?? ""),
      position: String(fd.get("position") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      modules,
      message: String(fd.get("message") ?? ""),
    });
    setLoading(false);
    if (res.ok) setDone(res.reference);
    else setError(res.error);
  }

  async function onPersonal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await submitContact({
      kind: "personal",
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      plan: String(fd.get("plan") ?? "Student Pro"),
      message: String(fd.get("message") ?? ""),
    });
    setLoading(false);
    if (res.ok) setDone(res.reference);
    else setError(res.error);
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400/60 focus:outline-none";

  return (
    <section id="contact" className="bg-[#060D24] py-20 md:py-28" aria-label={t.contact.label}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="section-label">{t.contact.label}</span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">{t.contact.title}</h2>
          <p className="mt-3 text-slate-300">{t.contact.subtitle}</p>
        </Reveal>

        <div className="mt-8 flex justify-center" role="tablist" aria-label="contact type">
          <div className="glass inline-flex rounded-2xl p-1.5">
            {(
              [
                { k: "school", label: t.contact.tabSchool },
                { k: "personal", label: t.contact.tabPersonal },
              ] as const
            ).map((x) => (
              <button
                key={x.k}
                role="tab"
                aria-selected={mode === x.k}
                onClick={() => { setMode(x.k); setDone(null); setError(null); }}
                className={`rounded-xl px-6 py-2.5 text-sm font-bold transition ${mode === x.k ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" : "text-slate-300 hover:text-white"}`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>

        <Reveal delay={0.08}>
          <div className="glass-strong mx-auto mt-8 max-w-3xl rounded-3xl p-6 sm:p-8">
            {done ? (
              <div className="py-6 text-center" role="status">
                <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-2xl" aria-hidden>✓</p>
                <h3 className="mt-4 text-xl font-bold text-white">{t.contact.successTitle}</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">{t.contact.successDesc}</p>
                <p className="mt-3 text-xs text-slate-500">Ref: {done}</p>
                <button onClick={() => setDone(null)} className="btn-secondary mt-6">
                  {lang === "zh" ? "填寫另一份" : "Send another"}
                </button>
              </div>
            ) : mode === "school" ? (
              <form onSubmit={onSchool} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.name} *</span>
                  <input name="name" required autoComplete="name" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.school} *</span>
                  <input name="school" required autoComplete="organization" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.position}</span>
                  <input name="position" autoComplete="organization-title" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.email} *</span>
                  <input name="email" type="email" required autoComplete="email" className={inputCls} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.phone}</span>
                  <input name="phone" type="tel" autoComplete="tel" className={inputCls} />
                </label>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-xs font-bold text-slate-200">{t.contact.modules}</legend>
                  <div className="flex flex-wrap gap-2">
                    {MODULES.map((m) => (
                      <label key={m} className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition ${modules.includes(m) ? "border-sky-400/50 bg-sky-400/15 text-sky-100" : "border-white/10 bg-white/5 text-slate-300"}`}>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={modules.includes(m)}
                          onChange={() => setModules((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]))}
                        />
                        {m}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.message}</span>
                  <textarea name="message" rows={3} className={inputCls} />
                </label>
                {error && <p role="alert" className="text-sm text-rose-300 sm:col-span-2">⚠ {error}</p>}
                <button type="submit" disabled={loading} className="btn-primary sm:col-span-2 disabled:opacity-60">
                  {loading ? "…" : t.contact.submitSchool}
                </button>
                <p className="text-center text-xs text-slate-500 sm:col-span-2">{t.contact.privacyNote}</p>
              </form>
            ) : (
              <form onSubmit={onPersonal} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.name} *</span>
                  <input name="name" required autoComplete="name" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.email} *</span>
                  <input name="email" type="email" required autoComplete="email" className={inputCls} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.plan}</span>
                  <select name="plan" className={`${inputCls} [&>option]:bg-slate-900`} defaultValue="Student Pro">
                    {["Student Basic", "Student Pro", "Family", "Not sure yet"].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.message}</span>
                  <textarea name="message" rows={3} className={inputCls} />
                </label>
                {error && <p role="alert" className="text-sm text-rose-300 sm:col-span-2">⚠ {error}</p>}
                <button type="submit" disabled={loading} className="btn-primary sm:col-span-2 disabled:opacity-60">
                  {loading ? "…" : t.contact.submitPersonal}
                </button>
                <p className="text-center text-xs text-slate-500 sm:col-span-2">{t.contact.privacyNote}</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
