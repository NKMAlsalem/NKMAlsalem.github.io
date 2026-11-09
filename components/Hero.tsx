"use client";

import { motion, useReducedMotion } from "framer-motion";
import { documents } from "@/data/documents";
import { useLanguage } from "./LanguageProvider";
import { Register } from "./Section";

export function Hero() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const rise = (delay: number) => (reduce ? {} : { initial: { opacity: 0.001, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } });

  const drafted = documents.filter((d) => d.versions.length > 0).length;
  const planned = documents.length - drafted;
  const lastUpdate = documents.flatMap((d) => d.versions.map((v) => v.date)).sort().at(-1) ?? "";
  const updated = lastUpdate
    ? new Date(`${lastUpdate}T12:00:00`).toLocaleDateString(lang === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

  const rows = [
    [t.hero.framework, t.hero.frameworkValue],
    [t.hero.documents, t.hero.documentsValue(drafted, planned)],
    [t.hero.languages, t.hero.languagesValue],
    [t.hero.company, t.hero.companyValue],
    [t.hero.updated, updated],
  ];

  return (
    <section id="top" className="grid items-start gap-12 border-b border-line pb-[72px] pt-16 md:grid-cols-[1.35fr_1fr]">
      <div className="min-w-0">
        <motion.p className="eyebrow" {...rise(0)}>{t.hero.eyebrow}</motion.p>
        <motion.h1 className="mt-4 text-[clamp(2.3rem,5.6vw,4.1rem)] font-extrabold leading-[1.04] [:root[lang=ar]_&]:text-[clamp(2rem,4.6vw,3.3rem)] [:root[lang=ar]_&]:leading-[1.35]" {...rise(0.08)}>
          {t.hero.titleStart}
          <em className="not-italic text-accent">{t.hero.titleEm}</em>
          {t.hero.titleEnd}
        </motion.h1>
        <motion.p className="mt-[22px] max-w-[65ch] text-[1.15rem] text-muted" {...rise(0.16)}>{t.hero.lede}</motion.p>
        <motion.div className="mt-[30px] flex flex-wrap gap-3" {...rise(0.24)}>
          <a href="#documents" className="btn btn-primary no-underline">{t.hero.primary}</a>
          <a href="#contact" className="btn no-underline">{t.hero.secondary}</a>
        </motion.div>
      </div>
      <motion.div className="min-w-0" {...rise(0.3)}>
        <Register title={t.hero.registerTitle} aside={<span className="label" dir="ltr">QIS</span>} rows={rows} />
      </motion.div>
    </section>
  );
}
