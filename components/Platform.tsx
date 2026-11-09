"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { signals, type Severity } from "@/data/signals";
import { useLanguage } from "./LanguageProvider";
import { Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";

const dot: Record<Severity, string> = { High: "bg-crit", Medium: "bg-amber", Low: "bg-muted" };
const pill: Record<Severity, string> = { High: "bg-crit-soft text-crit", Medium: "bg-amber-soft text-amber", Low: "bg-bg text-muted" };

export function Platform() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);
  const signal = signals[active];
  const text = signal[lang];

  return (
    <Section id="platform">
      <Reveal>
        <SectionHead eyebrow={t.platform.eyebrow} title={t.platform.title}>
          <div className="mt-1 flex flex-wrap gap-2">
            {t.platform.chips.map((chip) => <span key={chip} className="chip">{chip}</span>)}
            <span className="chip chip-amber">{t.platform.tag}</span>
          </div>
        </SectionHead>
      </Reveal>

      <div className="mb-12 grid gap-6 md:grid-cols-3 md:gap-8">
        {t.platform.columns.map(([title, body], i) => (
          <Reveal key={title} delay={i * 0.06} className="grid min-w-0 content-start gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-base text-muted">{body}</p>
          </Reveal>
        ))}
      </div>

      <p className="label mb-3.5">{t.platform.traceLabel}</p>
      <Reveal>
        <div className="card grid md:grid-cols-[300px_1fr]">
          <div role="tablist" aria-label={t.platform.signal} className="grid content-start border-b border-line md:border-b-0 md:border-e">
            <p className="label px-[18px] pb-2.5 pt-4">{t.platform.signal}</p>
            {signals.map((s, i) => (
              <button
                key={s.evidence}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2.5 border-t border-s-[3px] border-t-line px-4 py-[13px] text-start text-[15px] transition-colors ${i === active ? "border-s-accent bg-accent-soft" : "border-s-transparent hover:bg-bg"}`}
              >
                <span aria-hidden="true" className={`h-[9px] w-[9px] flex-none rounded-full ${dot[s.severity]}`} />
                <span>{s[lang].name}</span>
              </button>
            ))}
          </div>

          <div role="tabpanel" aria-live="polite" className="min-w-0 p-6 md:px-[30px] md:py-[26px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-${lang}`}
                className="grid content-start gap-[22px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid items-stretch gap-2.5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                  <Step label={t.platform.evidence}><code className="break-words font-mono text-[13px]" dir="ltr">{signal.evidence}</code></Step>
                  <Arrow />
                  <Step label={t.platform.subdomain}><strong>{text.control}</strong></Step>
                  <Arrow />
                  <Step label={t.platform.finding}>
                    <span className={`justify-self-start rounded px-2 py-0.5 font-label text-xs font-medium ${pill[signal.severity]}`}>{t.platform.severity[signal.severity]}</span>
                  </Step>
                </div>
                <div className="grid gap-1.5">
                  <span className="label">{t.platform.expects}</span>
                  <p>{text.requirement}</p>
                </div>
                <div className="grid gap-1.5 border-t border-line pt-[18px]">
                  <span className="label">{t.platform.action}</span>
                  <p>{text.fix}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
      <p className="mt-3.5 text-sm text-muted">{t.platform.note}</p>
    </Section>
  );
}

function Step({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid min-w-0 content-start gap-1.5 rounded-md border border-line px-3.5 py-3">
      <span className="label">{label}</span>
      {children}
    </div>
  );
}

function Arrow() {
  return <span aria-hidden="true" className="self-center ps-2.5 font-mono text-muted max-md:rotate-90 max-md:justify-self-start md:ps-0 rtl:md:-scale-x-100">→</span>;
}
