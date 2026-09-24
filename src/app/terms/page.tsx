import Link from "next/link";

export const metadata = { title: "Terms" };

export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-slate-200">
      <h1 className="text-3xl font-extrabold text-white">Terms — NEXUS Learn</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        This is a marketing website. Plans, pricing and availability may change. Signup pages currently register interest
        only — no payment is processed and no service commitment is created. School pilots are subject to a separate
        written agreement. We make no claim of government funding approval, regulatory compliance, or absolute security.
      </p>
      <Link href="/" className="mt-8 inline-block text-sky-300 hover:underline">← Back to home</Link>
    </main>
  );
}
