"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { documents, isFinal, phases, versionFile, type CaseDocument, type DocumentVersion } from "@/data/documents";
import { useLanguage } from "./LanguageProvider";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

interface Opened { doc: CaseDocument; version: DocumentVersion }

export function DocumentRegister() {
  const { t, lang } = useLanguage();
  const [opened, setOpened] = useState<Opened | null>(null);
  const available = documents.filter((d) => d.versions.length > 0);

  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpened(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <div id="documents" className="card scroll-mt-24" aria-label={t.docs.title}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-[18px] py-3">
          <span className="label">{t.docs.title}</span>
          <span className="label tabular-nums">{t.docs.count(available.length)}</span>
        </div>
        {phases.map((phase) => {
          const items = documents.filter((d) => d.phase === phase);
          if (items.length === 0) return null;
          return (
            <div key={phase}>
              <div className="label border-b border-line bg-bg px-[18px] py-2.5">{t.docs.phases[phase]}</div>
              {items.map((doc) => (
                <DocumentRow key={doc.id} doc={doc} onOpen={(version) => setOpened({ doc, version })} />
              ))}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpened(null)}
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
                  <span className="label">
                    <span dir="ltr">{opened.doc.id}</span> · <VersionLabel version={opened.version} />
                  </span>
                  <strong id="viewer-title" className="truncate">{opened.doc.title[lang]}</strong>
                </div>
                <div className="flex gap-2">
                  <a className="btn-sm no-underline" href={versionFile(opened.doc, opened.version, lang)} download>{t.docs.downloadPdf}</a>
                  <button type="button" className="btn-sm solid" onClick={() => setOpened(null)}>{t.docs.close}</button>
                </div>
              </div>
              <PdfViewer
                key={`${opened.doc.id}-${opened.version.version}-${lang}`}
                file={versionFile(opened.doc, opened.version, lang)}
                loadingText={t.docs.loading}
                errorText={t.docs.error}
                pageLabel={t.docs.page}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function VersionLabel({ version }: { version: DocumentVersion }) {
  const { t } = useLanguage();
  return <>{isFinal(version) ? t.docs.final : t.docs.draft} <span dir="ltr">v{version.version}</span></>;
}

function formatDate(iso: string, lang: "en" | "ar") {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(lang === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function Actions({ doc, version, onOpen, small = false }: { doc: CaseDocument; version: DocumentVersion; onOpen: () => void; small?: boolean }) {
  const { t, lang } = useLanguage();
  const size = small ? "px-2.5 py-1 text-xs" : "";
  if (doc.format === "xlsx") {
    return <a className={`btn-sm no-underline ${size}`} href={versionFile(doc, version, lang)} download>{t.docs.downloadXlsx}</a>;
  }
  return (
    <>
      <button type="button" className={`btn-sm ${small ? "" : "solid"} ${size}`} onClick={onOpen}>{t.docs.view}</button>
      <a className={`btn-sm no-underline ${size}`} href={versionFile(doc, version, lang)} download>{t.docs.downloadPdf}</a>
    </>
  );
}

function DocumentRow({ doc, onOpen }: { doc: CaseDocument; onOpen: (v: DocumentVersion) => void }) {
  const { t, lang } = useLanguage();
  const [showEarlier, setShowEarlier] = useState(false);
  const other = lang === "en" ? "ar" : "en";
  const [latest, ...earlier] = doc.versions;

  return (
    <div className="border-b border-line px-[18px] py-3.5 last:border-b-0">
      <div className="grid items-center gap-2 md:grid-cols-[128px_1fr_auto] md:gap-4">
        <span className="font-mono text-[12.5px] tabular-nums text-muted" dir="ltr">{doc.id}</span>
        <div className="grid min-w-0 gap-0.5">
          <strong className="text-base font-semibold">{doc.title[lang]}</strong>
          <span className="text-sm text-muted" lang={other}>{doc.title[other]}</span>
          {latest && (
            <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">
              <span className={`rounded px-2 py-0.5 font-label text-xs ${isFinal(latest) ? "bg-accent-soft text-accent" : "bg-amber-soft text-amber"}`}>
                <VersionLabel version={latest} />
              </span>
              <span className="tabular-nums">{formatDate(latest.date, lang)}</span>
              <span aria-hidden="true">·</span>
              <span>{latest.note[lang]}</span>
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          {latest ? (
            <Actions doc={doc} version={latest} onOpen={() => onOpen(latest)} />
          ) : (
            <span className="whitespace-nowrap rounded bg-bg px-2.5 py-1 font-label text-xs text-muted">{t.docs.planned}</span>
          )}
        </div>
      </div>

      {earlier.length > 0 && (
        <div className="mt-2 md:ms-[144px]">
          <button
            type="button"
            aria-expanded={showEarlier}
            onClick={() => setShowEarlier((s) => !s)}
            className="text-[13px] font-medium text-accent hover:underline"
          >
            {showEarlier ? t.docs.hideEarlier : t.docs.earlier(earlier.length)}
          </button>
          <AnimatePresence initial={false}>
            {showEarlier && (
              <motion.ul
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {earlier.map((v) => (
                  <li key={v.version} className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-md border border-line bg-bg px-3 py-2">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">
                      <span className="font-label text-xs text-ink"><VersionLabel version={v} /></span>
                      <span className="tabular-nums">{formatDate(v.date, lang)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{v.note[lang]}</span>
                    </span>
                    <span className="flex gap-2">
                      <Actions doc={doc} version={v} onOpen={() => onOpen(v)} small />
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
