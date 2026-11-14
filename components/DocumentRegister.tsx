"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { documents, fileLang, isFinal, phases, versionFile, type CaseDocument, type DocumentVersion } from "@/data/documents";
import type { Lang } from "@/content/copy";
import { useLanguage } from "./LanguageProvider";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface Opened { doc: CaseDocument; version: DocumentVersion }

const kinds: Record<string, { en: string; ar: string }> = {
  PRF: { en: "Profile", ar: "ملف تعريفي" },
  AST: { en: "Inventory", ar: "سجل" },
  RMM: { en: "Methodology", ar: "منهجية" },
  RR: { en: "Register", ar: "سجل" },
  GAP: { en: "Assessment", ar: "تقييم" },
  RTP: { en: "Plan", ar: "خطة" },
  CHR: { en: "Charter", ar: "ميثاق" },
  POL: { en: "Policy", ar: "سياسة" },
  PRC: { en: "Procedure", ar: "إجراء" },
  IRP: { en: "Plan", ar: "خطة" },
  BCP: { en: "Plan", ar: "خطة" },
  KPI: { en: "Dashboard", ar: "لوحة مؤشرات" },
  HBK: { en: "Handbook", ar: "دليل" },
};
const kindOf = (doc: CaseDocument) => kinds[doc.id.split("-")[1]];

function Logo({ name, size, className = "" }: { name: "qis-glyph" | "alsalem-glyph"; size: number; className?: string }) {
  const light = name === "qis-glyph" ? "qis-glyph-ink" : "alsalem-glyph-teal";
  const dark = name === "qis-glyph" ? "qis-glyph-paper" : "alsalem-glyph-paper";
  return (
    <span className={`inline-flex shrink-0 ${className}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}/brand/${light}.svg`} alt="" width={size} height={size} className="on-light" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}/brand/${dark}.svg`} alt="" width={size} height={size} className="on-dark" />
    </span>
  );
}

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
      <div id="documents" className="scroll-mt-24" aria-label={t.docs.title}>
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-3">
          <h3 className="text-xl font-semibold">{t.docs.title}</h3>
          <span className="label tabular-nums">{t.docs.count(available.length)}</span>
        </div>
        <div className="mt-6 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {phases.flatMap((phase) => documents.filter((d) => d.phase === phase)).map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onOpen={(version) => setOpened({ doc, version })} />
          ))}
        </div>
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
              className="grid h-[min(92vh,1100px)] w-[min(920px,100%)] grid-rows-[auto_1fr] overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_8px_24px_rgba(15,28,32,0.10)]"
              initial={{ y: 24, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
                <div className="grid min-w-0">
                  <span className="label">
                    <span dir="ltr" className="font-mono normal-case">{opened.doc.id}</span> · <VersionLabel version={opened.version} />
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

function formatDate(iso: string, lang: Lang) {
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

function DocumentCard({ doc, onOpen }: { doc: CaseDocument; onOpen: (v: DocumentVersion) => void }) {
  const { t, lang } = useLanguage();
  const [showHistory, setShowHistory] = useState(false);
  const other: Lang = lang === "en" ? "ar" : "en";
  // Show the versions that exist in the page language; fall back to all of them only
  // when the document has no version in that language yet.
  const inLang = doc.versions.filter((v) => (v.langs ?? ["ar", "en"]).includes(lang));
  const shown = inLang.length ? inLang : doc.versions;
  const latest = shown[0];
  const newerElsewhere = latest && doc.versions[0] !== latest ? doc.versions[0] : undefined;
  const kind = kindOf(doc);
  const author = doc.id.startsWith("NAS-");

  if (!latest) {
    return (
      <article className="flex flex-col gap-2 rounded-lg border border-dashed border-line-strong p-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted">{kind?.[lang]}</span>
          <span className="rounded bg-sunken px-2 py-0.5 font-label text-xs text-muted">{t.docs.planned}</span>
          <span className="ms-auto text-[13px] text-muted">{t.docs.phases[doc.phase]}</span>
        </div>
        <h5 className="font-display text-lg font-semibold leading-snug text-muted">{doc.title[lang]}</h5>
        <span className="font-mono text-[13px] text-muted" dir="ltr">{doc.id}</span>
      </article>
    );
  }

  const onlyIn = fileLang(latest, lang) !== lang;

  return (
    <article className="card flex flex-col gap-3 p-6">
      <div className="flex items-center gap-2">
        <Logo name={author ? "alsalem-glyph" : "qis-glyph"} size={20} />
        <span className="eyebrow">{kind?.[lang]}</span>
        <span className="ms-auto text-[13px] text-muted">{t.docs.phases[doc.phase]}</span>
      </div>
      <div className="grid gap-0.5">
        <h5 className="font-display text-lg font-semibold leading-snug text-ink">{doc.title[lang]}</h5>
        <span className="text-sm text-muted" lang={other}>{doc.title[other]}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[13px] text-muted">
        <span className="font-mono text-[13px]" dir="ltr">{doc.id}</span>
        <span className={`rounded px-2 py-0.5 font-label text-xs ${isFinal(latest) ? "bg-accent-soft text-accent" : "bg-amber-soft text-amber"}`}>
          <VersionLabel version={latest} />
        </span>
        <span className="tabular-nums">{formatDate(latest.date, lang)}</span>
      </div>
      <p className="m-0 text-sm text-muted">{latest.note[lang]}</p>
      {onlyIn && <p className="m-0 text-[13px] text-muted">{t.docs.arabicOnly}</p>}
      {newerElsewhere && <p className="m-0 text-[13px] text-muted">{t.docs.newerInOther(newerElsewhere.version)}</p>}
      <div className="flex flex-wrap items-center gap-2">
        <Actions doc={doc} version={latest} onOpen={() => onOpen(latest)} />
      </div>

      {shown.length > 1 && (
        <div>
          <button
            type="button"
            aria-expanded={showHistory}
            onClick={() => setShowHistory((s) => !s)}
            className="text-[13px] font-semibold text-accent hover:text-accent-hover hover:underline"
          >
            {showHistory ? t.docs.hideHistory : t.docs.history(shown.length)}
          </button>
          <AnimatePresence initial={false}>
            {showHistory && (
              <motion.ol
                className="vh mt-3 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {shown.map((v, i) => (
                  <li key={v.version} className={i === 0 ? "current" : ""}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[13px] font-medium text-ink" dir="ltr">v{v.version}</span>
                      {i === 0 && <span className="rounded bg-accent-soft px-1.5 py-0.5 font-label text-xs font-semibold text-accent">{t.docs.current}</span>}
                      <span className="text-[13px] tabular-nums text-muted">{formatDate(v.date, lang)}</span>
                    </div>
                    <p className="m-0 mt-0.5 text-[13px] text-ink">{v.note[lang]}</p>
                    {i > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        <Actions doc={doc} version={v} onOpen={() => onOpen(v)} small />
                      </div>
                    )}
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-auto flex items-center gap-2 border-t border-line pt-3 text-[13px] text-muted">
        <Logo name="alsalem-glyph" size={16} />
        <span>{t.docs.preparedBy}</span>
      </div>
    </article>
  );
}
