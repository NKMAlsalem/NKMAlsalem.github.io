"use client";

import { useLanguage } from "./LanguageProvider";
import { DocumentRegister } from "./DocumentRegister";
import { Register, Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";

export function CaseStudy() {
  const { t } = useLanguage();
  return (
    <Section id="case">
      <Reveal>
        <SectionHead eyebrow={t.case.eyebrow} title={t.case.title}>
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
          <Register title={t.case.recordTitle} aside={<span className="eyebrow">QIS</span>} rows={t.case.record} />
        </Reveal>
      </div>
    </Section>
  );
}
