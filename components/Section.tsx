import type { ReactNode } from "react";

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-20 border-b border-line py-14 last:border-b-0 md:py-[72px] ${className}`}>
      {children}
    </section>
  );
}

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-9 grid gap-3">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-bold leading-[1.15] [:root[lang=ar]_&]:leading-[1.45]">{title}</h2>
      {children}
    </div>
  );
}

export function Register({ title, aside, rows, keyWidth = "112px" }: { title: string; aside: ReactNode; rows: string[][]; keyWidth?: string }) {
  return (
    <aside className="card">
      <div className="flex justify-between gap-3 border-b border-line px-[18px] py-3">
        <span className="eyebrow">{title}</span>
        {aside}
      </div>
      <dl>
        {rows.map(([key, value]) => (
          <div key={key} className="grid gap-3.5 border-b border-line px-[18px] py-[13px] text-[15px] last:border-b-0" style={{ gridTemplateColumns: `${keyWidth} 1fr` }}>
            <dt className="eyebrow pt-[3px]">{key}</dt>
            <dd className="min-w-0">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
