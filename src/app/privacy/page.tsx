import Link from "next/link";

export const metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-slate-200">
      <h1 className="text-3xl font-extrabold text-white">Privacy — NEXUS Learn</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        This marketing site collects only the details you voluntarily provide in interest forms. We use them solely to
        respond to your enquiry. We do not sell personal data, we minimise collection, and we will connect a documented
        backend / CRM endpoint before any production launch. For questions, use the contact form on the home page.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">
         putative Chinese summary: 本網站僅收集你主動提供的聯絡資料，只用於回覆查詢，不會出售個人資料。
      </p>
      <Link href="/" className="mt-8 inline-block text-sky-300 hover:underline">← Back to home</Link>
    </main>
  );
}
