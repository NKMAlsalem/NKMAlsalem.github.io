"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Register, Section, SectionHead } from "./Section";
import { Reveal } from "./Reveal";

export function Approach() {
  const { t } = useLanguage();
  return (
    <Section id="approach">
      <Reveal><SectionHead eyebrow={t.approach.eyebrow} title={t.approach.title} /></Reveal>
      <div className="grid border-t-2 border-ink md:grid-cols-3">
        {t.approach.items.map(([title, body], i) => (
          <Reveal
            key={title}
            delay={i * 0.06}
            className={`grid min-w-0 content-start gap-2.5 py-5 md:pb-0 md:pe-6 md:pt-6 ${i > 0 ? "border-t border-line md:border-s md:border-t-0 md:ps-6" : ""}`}
          >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-base text-muted">{body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Skills() {
  const { t } = useLanguage();
  return (
    <Section id="skills">
      <Reveal><SectionHead eyebrow={t.skills.eyebrow} title={t.skills.title} /></Reveal>
      <div className="grid gap-10 md:grid-cols-2">
        {t.skills.groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.06} className="min-w-0">
            <h3 className="text-lg font-semibold">{group.title}</h3>
            <ul className="mt-3.5">
              {group.items.map(([skill, level]) => (
                <li key={skill} className="flex justify-between gap-4 border-b border-line py-3 text-base">
                  <span>{skill}</span>
                  <span className="whitespace-nowrap pt-[3px] font-label text-xs text-muted">{t.skills.levels[level as keyof typeof t.skills.levels]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Lab() {
  const { t } = useLanguage();
  return (
    <Section id="lab">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <Reveal className="grid min-w-0 gap-3">
          <p className="eyebrow">{t.lab.eyebrow}</p>
          <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-bold leading-[1.15]">{t.lab.title}</h2>
          {t.lab.body.map((p) => <p key={p.slice(0, 24)} className="mt-2 max-w-[65ch]">{p}</p>)}
        </Reveal>
        <Reveal delay={0.08} className="min-w-0">
          <Register title={t.lab.recordTitle} aside={<span className="chip chip-amber">{t.lab.state}</span>} rows={t.lab.record} keyWidth="96px" />
        </Reveal>
      </div>
    </Section>
  );
}

const EMAIL = "NKMAlsalem@gmail.com";

export function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.getSelection()?.selectAllChildren(document.getElementById("email")!);
    }
  };

  return (
    <Section id="contact">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <Reveal className="grid min-w-0 gap-3">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-bold leading-[1.15]">{t.contact.title}</h2>
          <p className="mt-2 max-w-[65ch]">{t.contact.body}</p>
        </Reveal>
        <Reveal delay={0.08} className="min-w-0 border-t border-line">
          <ContactRow label={t.contact.email}>
            <span className="flex items-center gap-2">
              <a id="email" href={`mailto:${EMAIL}`} dir="ltr" className="text-accent">{EMAIL}</a>
              <button type="button" onClick={copyEmail} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted hover:border-ink hover:text-ink">
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </span>
          </ContactRow>
          <ContactRow label="LinkedIn">
            <a href="https://www.linkedin.com/in/nkmalsalem/" target="_blank" rel="noopener noreferrer" dir="ltr" className="text-accent">linkedin.com/in/nkmalsalem</a>
          </ContactRow>
          <ContactRow label="GitHub">
            <a href="https://github.com/NKMAlsalem" target="_blank" rel="noopener noreferrer" dir="ltr" className="text-accent">github.com/NKMAlsalem</a>
          </ContactRow>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3.5">
      <span className="label">{label}</span>
      {children}
    </div>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-line pb-10 pt-7 text-sm text-muted">
      <div className="wrap flex flex-wrap justify-between gap-3">
        <span>{t.footer}</span>
        <a href="https://github.com/NKMAlsalem/NKMAlsalem.github.io" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">{t.footerSource}</a>
      </div>
    </footer>
  );
}
