"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, type Copy, type Lang } from "@/content/copy";

interface LanguageState { lang: Lang; t: Copy; setLang: (lang: Lang) => void }

const LanguageContext = createContext<LanguageState | null>(null);
const STORAGE_KEY = "lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "en") setLangState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = lang === "ar" ? "نايف السالم | الحوكمة والمخاطر والالتزام" : "Naif Alsalem | GRC Portfolio";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  return <LanguageContext.Provider value={{ lang, t: copy[lang], setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageState {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
