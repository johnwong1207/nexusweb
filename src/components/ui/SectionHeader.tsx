import { Reveal } from "../Reveal";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeader({ eyebrow, title, subtitle, align = "center", id }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <span className="section-label">{eyebrow}</span>
      <h2 id={id} className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-paper sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 leading-relaxed text-muted">{subtitle}</p> : null}
    </Reveal>
  );
}
