"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "splash-seen";
const EMAIL = "NKMAlsalem@gmail.com";

export function Splash() {
  const [visible, setVisible] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (!seen) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    button.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [visible]);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable */
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-bg/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="splash-title-en"
            className="card w-full max-w-[640px]"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-between gap-3 border-b border-line px-6 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Notice</span>
              <span className="text-[13px] text-muted" style={{ fontFamily: "'Noto Kufi Arabic', Tahoma, sans-serif" }}>تنبيه</span>
            </div>

            <div className="grid gap-6 px-6 py-7 sm:grid-cols-2 sm:gap-8">
              <div lang="en" dir="ltr" className="grid content-start gap-2.5" style={{ fontFamily: "'Schibsted Grotesk', 'Helvetica Neue', Arial, sans-serif" }}>
                <h2 id="splash-title-en" className="text-2xl font-bold leading-tight">This is a portfolio, not a company website.</h2>
                <p className="text-[15px] text-muted">
                  Made by Naif Alsalem to show his GRC work. Qayrawan Information Systems and its clients are fictional, created for the case study.
                </p>
              </div>
              <div lang="ar" dir="rtl" className="grid content-start gap-2.5 border-t border-line pt-6 sm:border-s sm:border-t-0 sm:ps-8 sm:pt-0" style={{ fontFamily: "'Noto Kufi Arabic', Tahoma, sans-serif" }}>
                <h2 className="text-xl font-bold leading-relaxed" style={{ letterSpacing: 0 }}>هذا ملف أعمال، وليس موقع شركة.</h2>
                <p className="text-[14px] leading-7 text-muted">
                  أعدّه نايف السالم لعرض أعماله في الحوكمة والمخاطر والالتزام. شركة قيروان لأنظمة المعلومات وعملاؤها افتراضيون، أُنشئوا لدراسة الحالة.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4">
              <a href={`mailto:${EMAIL}`} dir="ltr" className="font-mono text-sm text-accent">{EMAIL}</a>
              <button ref={button} type="button" onClick={dismiss} className="btn btn-primary">
                <span>Enter</span>
                <span className="mx-2 opacity-50" aria-hidden="true">·</span>
                <span style={{ fontFamily: "'Noto Kufi Arabic', Tahoma, sans-serif" }}>دخول</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
