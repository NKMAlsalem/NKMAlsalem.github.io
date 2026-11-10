"use client";

import { useLanguage } from "./LanguageProvider";
import { DocumentRegister } from "./DocumentRegister";
import { Register, Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function CaseStudy() {
  const { t } = useLanguage();
  return (
    <Section id="case">
      <Reveal>
        <SectionHead
          eyebrow={t.case.eyebrow}
          title={t.case.title}
          mark={
            <span className="inline-flex" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${base}/brand/qis-mark.svg`} alt="" width={48} height={48} className="on-light rounded-[10px]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${base}/brand/qis-glyph-paper.svg`} alt="" width={48} height={48} className="on-dark" />
            </span>
          }
        >
          <div className="mt-1 flex flex-wrap gap-2">
            {t.case.chips.map((chip) => <span key={chip} className="chip">{chip}</span>)}
            <span className="chip chip-amber">{t.case.fictional}</span>
          </div>
        </SectionHead>
      </Reveal>
      <Reveal>
        <DocumentRegister />
      </Reveal>
      <p className="mt-3.5 text-sm text-muted">{t.case.note}</p>
      <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
        <Reveal className="grid min-w-0 gap-3.5">
          {t.case.story.map((p) => <p key={p.slice(0, 24)} className="max-w-[65ch] text-base text-muted">{p}</p>)}
        </Reveal>
        <Reveal delay={0.08} className="min-w-0">
          <Register title={t.case.recordTitle} aside={<span className="label">QIS</span>} rows={t.case.record} />
        </Reveal>
      </div>
    </Section>
  );
}
