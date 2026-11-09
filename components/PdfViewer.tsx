"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/pdf.worker.min.js`;

interface Props { file: string; loadingText: string; errorText: string; pageLabel: string }

export default function PdfViewer({ file, loadingText, errorText, pageLabel }: Props) {
  const [pages, setPages] = useState(0);
  const [width, setWidth] = useState(800);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.min(entry.contentRect.width - 32, 860)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={box} className="h-full overflow-auto bg-bg p-4">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setPages(numPages)}
        loading={<p className="py-10 text-center text-muted">{loadingText}</p>}
        error={<p className="py-10 text-center text-muted">{errorText}</p>}
        className="grid justify-items-center gap-4"
      >
        {Array.from({ length: pages }, (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-sm"
            aria-label={`${pageLabel} ${i + 1}`}
          />
        ))}
      </Document>
    </div>
  );
}
