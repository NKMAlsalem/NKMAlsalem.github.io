"use client";

import { useLanguage } from "./LanguageProvider";
import { ThemeToggle } from "./ThemeToggle";
import type { Lang } from "@/content/copy";

const links = ["case", "platform", "approach", "skills", "contact"] as const;

export function Nav() {
  const { t, lang, setLang } = useLanguage();
  const options: { value: Lang; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ar", label: "عربي" },
  ];

  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-bg/90 py-3.5 backdrop-blur" style={{ paddingTop: "calc(14px + env(safe-area-inset-top))" }}>
      <div className="wrap flex flex-wrap items-center justify-between gap-4">
        <a href="#top" className="inline-flex items-center gap-2.5 font-display font-bold text-ink no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/alsalem-mark.svg`} alt="" width={28} height={28} className="rounded-[6px]" />
          {t.name}
        </a>
        <div className="flex flex-wrap items-center gap-5">
          <ul className="flex flex-wrap gap-5">
            {links.map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="text-[15px] text-muted no-underline transition-colors hover:text-ink">{t.nav[key]}</a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <div role="group" aria-label="Language" className="inline-flex rounded-full border border-line-strong bg-surface p-[3px]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                lang={option.value}
                aria-pressed={lang === option.value}
                onClick={() => setLang(option.value)}
                style={{ fontFamily: option.value === "ar" ? "'Noto Kufi Arabic', Tahoma, sans-serif" : "var(--font-mono)" }}
                className={`rounded-full px-3 py-1 text-[13px] font-semibold transition-colors ${lang === option.value ? "bg-accent text-on-accent" : "text-muted hover:text-ink"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
