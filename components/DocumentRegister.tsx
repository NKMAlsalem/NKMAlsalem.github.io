"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { documents, documentFile, phases, type CaseDocument } from "@/data/documents";
import { useLanguage } from "./LanguageProvider";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

export function DocumentRegister() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState<CaseDocument | null>(null);
  const tracked = documents.filter((d) => d.status !== "planned");
  const published = tracked.filter((d) => d.status === "published").length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="card" aria-label={t.docs.title}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-[18px] py-3">
          <span className="eyebrow">{t.docs.title}</span>
          <span className="eyebrow tabular-nums">{t.docs.count(published, tracked.length)}</span>
        </div>
        {phases.map((phase) => {
          const items = documents.filter((d) => d.phase === phase);
          if (items.length === 0) return null;
          return (
            <div key={phase}>
              <div className="eyebrow border-b border-line bg-bg px-[18px] py-2.5">{t.docs.phases[phase]}</div>
              {items.map((doc) => (
                <DocumentRow key={doc.id} doc={doc} onView={() => setOpen(doc)} />
              ))}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="viewer-title"
              className="grid h-[min(92vh,1100px)] w-[min(920px,100%)] grid-rows-[auto_1fr] overflow-hidden rounded-xl border border-line bg-surface"
              initial={{ y: 24, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
                <div className="grid min-w-0">
                  <span className="eyebrow" dir="ltr">{open.id}</span>
                  <strong id="viewer-title" className="truncate">{open.title[lang]}</strong>
                </div>
                <div className="flex gap-2">
                  <a className="btn-sm no-underline" href={documentFile(open, lang)} download>{t.docs.downloadPdf}</a>
                  <button type="button" className="btn-sm bg-ink text-bg" onClick={() => setOpen(null)}>{t.docs.close}</button>
                </div>
              </div>
              <PdfViewer file={documentFile(open, lang)} loadingText={t.docs.loading} errorText={t.docs.error} pageLabel={t.docs.page} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DocumentRow({ doc, onView }: { doc: CaseDocument; onView: () => void }) {
  const { t, lang } = useLanguage();
  const other = lang === "en" ? "ar" : "en";

  let action;
  if (doc.status === "planned") {
    action = <span className="whitespace-nowrap rounded bg-bg px-2.5 py-1 font-label text-xs text-muted">{t.docs.planned}</span>;
  } else if (doc.status === "review") {
    action = <span className="whitespace-nowrap rounded bg-amber-soft px-2.5 py-1 font-label text-xs text-amber">{t.docs.inReview}</span>;
  } else if (doc.format === "xlsx") {
    action = <a className="btn-sm no-underline" href={documentFile(doc, lang)} download>{t.docs.downloadXlsx}</a>;
  } else {
    action = (
      <>
        <button type="button" className="btn-sm bg-ink text-bg" onClick={onView}>{t.docs.view}</button>
        <a className="btn-sm no-underline" href={documentFile(doc, lang)} download>{t.docs.downloadPdf}</a>
      </>
    );
  }

  return (
    <div className="grid items-center gap-2 border-b border-line px-[18px] py-3.5 last:border-b-0 md:grid-cols-[128px_1fr_auto] md:gap-4">
      <span className="font-mono text-[12.5px] tabular-nums text-muted" dir="ltr">{doc.id}</span>
      <div className="grid min-w-0 gap-0.5">
        <strong className="text-base font-semibold">{doc.title[lang]}</strong>
        <span className="text-sm text-muted" lang={other}>{doc.title[other]}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:justify-end">{action}</div>
    </div>
  );
}
