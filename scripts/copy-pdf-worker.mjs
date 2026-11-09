import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const pdfjsDir = path.dirname(require.resolve("pdfjs-dist/package.json", { paths: [require.resolve("react-pdf")] }));
const source = path.join(pdfjsDir, "build", "pdf.worker.min.js");
const target = path.join(process.cwd(), "public", "pdf.worker.min.js");

if (!existsSync(source)) {
  console.error(`PDF worker not found at ${source}`);
  process.exit(1);
}
mkdirSync(path.dirname(target), { recursive: true });
copyFileSync(source, target);
console.log("Copied PDF worker to public/");
