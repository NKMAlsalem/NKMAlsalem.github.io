"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { Register } from "./Section";

export function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const rise = (delay: number) => (reduce ? {} : { initial: { opacity: 0.001, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } });

  return (
    <section id="top" className="grid items-start gap-12 border-b border-line pb-[72px] pt-16 md:grid-cols-[1.35fr_1fr]">
      <div className="min-w-0">
        <motion.p className="eyebrow" {...rise(0)}>{t.hero.eyebrow}</motion.p>
        <motion.h1 className="mt-4 text-[clamp(2.3rem,5.6vw,4.1rem)] font-extrabold leading-[1.04] [:root[lang=ar]_&]:text-[clamp(2rem,4.6vw,3.3rem)] [:root[lang=ar]_&]:leading-[1.35]" {...rise(0.08)}>
          {t.hero.titleStart}
          <em className="not-italic text-accent">{t.hero.titleEm}</em>
          {t.hero.titleEnd}
        </motion.h1>
        <motion.p className="mt-[22px] max-w-[65ch] text-[1.2rem] text-muted" {...rise(0.16)}>{t.hero.lede}</motion.p>
        <motion.div className="mt-[30px] flex flex-wrap gap-3" {...rise(0.24)}>
          <a href="#case" className="btn btn-primary no-underline">{t.hero.primary}</a>
          <a href="#contact" className="btn no-underline">{t.hero.secondary}</a>
        </motion.div>
      </div>
      <motion.div className="min-w-0" {...rise(0.3)}>
        <Register title={t.hero.registerTitle} aside={<span className="eyebrow">{t.hero.registerRev}</span>} rows={t.hero.register} />
      </motion.div>
    </section>
  );
}
