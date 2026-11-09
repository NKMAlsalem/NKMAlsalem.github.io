export type Phase = "context" | "identify" | "assess" | "treat" | "govern" | "operate" | "method";
export type Lang = "en" | "ar";

export interface DocumentVersion {
  version: string;
  date: string;
  note: { en: string; ar: string };
}

export interface CaseDocument {
  id: string;
  phase: Phase;
  title: { en: string; ar: string };
  format?: "pdf" | "xlsx";
  planned?: boolean;
  /** Newest first. A version of "1.0" or higher is treated as final. */
  versions: DocumentVersion[];
}

export const phases: Phase[] = ["context", "identify", "assess", "treat", "govern", "operate", "method"];

const first = { en: "First draft", ar: "المسودة الأولى" };
const catastrophic = { en: "Top risk level renamed \"Catastrophic\"", ar: "تسمية أعلى مستوى للمخاطر «كارثي»" };

export const documents: CaseDocument[] = [
  {
    id: "QIS-PRF-001", phase: "context",
    title: { en: "Company Profile and Program Scope", ar: "ملف الشركة ونطاق البرنامج" },
    versions: [
      { version: "0.2", date: "2026-11-04", note: { en: "Open items resolved; contractors and the Jeddah office added", ar: "حسم البنود المفتوحة، وإضافة المتعاقدين ومكتب جدة" } },
      { version: "0.1", date: "2026-10-24", note: first },
    ],
  },
  { id: "QIS-AST-001", phase: "identify", planned: true, versions: [], title: { en: "Asset Inventory", ar: "سجل الأصول" } },
  {
    id: "QIS-RMM-001", phase: "assess",
    title: { en: "Risk Management Methodology", ar: "منهجية إدارة المخاطر" },
    versions: [
      { version: "0.2", date: "2026-11-09", note: catastrophic },
      { version: "0.1", date: "2026-11-04", note: first },
    ],
  },
  {
    id: "QIS-RR-001", phase: "assess", format: "xlsx",
    title: { en: "Risk Register", ar: "سجل المخاطر" },
    versions: [
      { version: "0.2", date: "2026-11-09", note: catastrophic },
      { version: "0.1", date: "2026-11-04", note: { en: "First draft: 20 risks scored on the 5×5 matrix", ar: "المسودة الأولى: 20 خطراً مقيّمة بمصفوفة 5×5" } },
    ],
  },
  { id: "QIS-GAP-001", phase: "assess", planned: true, versions: [], title: { en: "ECC Gap Assessment", ar: "تقييم الفجوات مقابل الضوابط الأساسية" } },
  { id: "QIS-RTP-001", phase: "treat", planned: true, versions: [], title: { en: "Risk Treatment Plan", ar: "خطة معالجة المخاطر" } },
  {
    id: "QIS-CHR-001", phase: "govern",
    title: { en: "Cybersecurity Charter and Structure", ar: "ميثاق الأمن السيبراني وهيكله التنظيمي" },
    versions: [
      { version: "0.2", date: "2026-11-09", note: catastrophic },
      { version: "0.1", date: "2026-11-05", note: first },
    ],
  },
  {
    id: "QIS-POL-001", phase: "govern",
    title: { en: "Data Protection Policy", ar: "سياسة حماية البيانات" },
    versions: [{ version: "0.1", date: "2026-11-05", note: first }],
  },
  {
    id: "QIS-POL-002", phase: "govern",
    title: { en: "AI Usage Policy and Procedure", ar: "سياسة وإجراء استخدام الذكاء الاصطناعي" },
    versions: [{ version: "0.1", date: "2026-11-05", note: first }],
  },
  {
    id: "QIS-IRP-001", phase: "operate",
    title: { en: "Incident Response Plan", ar: "خطة الاستجابة للحوادث السيبرانية" },
    versions: [
      { version: "0.2", date: "2026-11-09", note: { en: "NCA deadline source updated; breach notice now covers every personal data breach", ar: "تحديث مصدر مهلة إبلاغ الهيئة، والإبلاغ عن كل تسرب للبيانات الشخصية" } },
      { version: "0.1", date: "2026-11-05", note: first },
    ],
  },
  {
    id: "QIS-BCP-001", phase: "operate",
    title: { en: "Business Continuity Plan", ar: "خطة استمرارية الأعمال" },
    versions: [
      { version: "0.2", date: "2026-11-09", note: catastrophic },
      { version: "0.1", date: "2026-11-05", note: first },
    ],
  },
  {
    id: "QIS-KPI-001", phase: "operate", format: "xlsx",
    title: { en: "KPI and KRI Dashboard", ar: "لوحة مؤشرات الأداء والمخاطر" },
    versions: [
      { version: "0.2", date: "2026-11-09", note: catastrophic },
      { version: "0.1", date: "2026-11-05", note: { en: "First draft with six months of illustrative data", ar: "المسودة الأولى ببيانات توضيحية لستة أشهر" } },
    ],
  },
  {
    id: "NAS-HBK-001", phase: "method",
    title: { en: "GRC Methodology Handbook", ar: "دليل منهجيات الحوكمة والمخاطر والالتزام" },
    versions: [{ version: "0.1", date: "2026-11-07", note: { en: "First draft: seven chapters written, three outlined", ar: "المسودة الأولى: سبعة فصول مكتوبة وثلاثة هياكل" } }],
  },
];

export const isFinal = (v: DocumentVersion) => parseFloat(v.version) >= 1;

export function versionFile(doc: CaseDocument, v: DocumentVersion, lang: Lang): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (doc.format === "xlsx") return `${base}/docs/${doc.id}_v${v.version}.xlsx`;
  return `${base}/docs/${doc.id}_${lang.toUpperCase()}_v${v.version}.pdf`;
}
