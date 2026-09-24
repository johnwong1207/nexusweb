"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { submitContact } from "@/lib/contact-service";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function Inner({ kind }: { kind: "student" | "family" | "school" }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  const title = kind === "student" ? t.signup.studentTitle : kind === "family" ? t.signup.familyTitle : t.signup.schoolTitle;
  const desc = kind === "student" ? t.signup.studentDesc : kind === "family" ? t.signup.familyDesc : t.signup.schoolDesc;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res =
      kind === "school"
        ? await submitContact({
            kind: "school",
            name: String(fd.get("name") ?? ""),
            school: String(fd.get("school") ?? ""),
            position: String(fd.get("position") ?? ""),
            email: String(fd.get("email") ?? ""),
            phone: "",
            modules: [String(fd.get("modules") ?? "General")],
          })
        : await submitContact({
            kind: "personal",
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            plan: kind === "student" ? "Student Pro" : "Family",
          });
    setLoading(false);
    if (res.ok) setRef(res.reference);
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400/60 focus:outline-none";

  return (
    <>
      <Header />
      <main id="main" className="relative min-h-screen bg-[#050B1E] pb-20 pt-28">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <p className="inline-block rounded-full border border-amber-300/25 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-200">
            {t.signup.comingSoon} · {t.signup.noPayment}
          </p>
          <h1 className="mt-5 text-3xl font-extrabold text-white">{title}</h1>
          <p className="mt-3 text-slate-300">{desc}</p>
          <div className="glass-strong mt-8 rounded-3xl p-6 sm:p-8">
            {ref ? (
              <div className="py-4 text-center" role="status">
                <p className="text-4xl" aria-hidden>✓</p>
                <p className="mt-3 font-bold text-white">{t.contact.successTitle}</p>
                <p className="mt-1 text-xs text-slate-500">Ref: {ref}</p>
                <Link href="/" className="btn-secondary mt-6 w-full">{t.signup.backHome}</Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.name} *</span>
                  <input name="name" required autoComplete="name" className={inputCls} />
                </label>
                {kind === "school" && (
                  <>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.school} *</span>
                      <input name="school" required className={inputCls} />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.position}</span>
                      <input name="modules" placeholder="e.g. Teacher Copilot, Assessment" className={inputCls} />
                    </label>
                  </>
                )}
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-200">{t.contact.email} *</span>
                  <input name="email" type="email" required autoComplete="email" className={inputCls} />
                </label>
                <button className="btn-primary w-full" disabled={loading}>
                  {loading ? "…" : t.contact.submitPersonal}
                </button>
              </form>
            )}
          </div>
          <Link href="/" className="mt-6 inline-block text-sm text-sky-300 hover:underline">← {t.signup.backHome}</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function SignupPage({ kind }: { kind: "student" | "family" | "school" }) {
  return (
    <Providers>
      <Inner kind={kind} />
    </Providers>
  );
}
