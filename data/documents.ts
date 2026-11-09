export type Phase = "context" | "identify" | "assess" | "treat" | "govern" | "operate" | "method";

export interface CaseDocument {
  id: string;
  phase: Phase;
  title: { en: string; ar: string };
  status: "published" | "review" | "planned";
  format?: "pdf" | "xlsx";
}

export const phases: Phase[] = ["context", "identify", "assess", "treat", "govern", "operate", "method"];

/**
 * To publish a document, add its v1.0 files to public/docs
 * (e.g. QIS-PRF-001_EN_v1.0.pdf and QIS-PRF-001_AR_v1.0.pdf) and set status to "published".
 */
export const documents: CaseDocument[] = [
  { id: "QIS-PRF-001", phase: "context", status: "review", title: { en: "Company Profile and Program Scope", ar: "ملف الشركة ونطاق البرنامج" } },
  { id: "QIS-AST-001", phase: "identify", status: "planned", title: { en: "Asset Inventory", ar: "سجل الأصول" } },
  { id: "QIS-RMM-001", phase: "assess", status: "review", title: { en: "Risk Management Methodology", ar: "منهجية إدارة المخاطر" } },
  { id: "QIS-RR-001", phase: "assess", status: "review", format: "xlsx", title: { en: "Risk Register", ar: "سجل المخاطر" } },
  { id: "QIS-GAP-001", phase: "assess", status: "planned", title: { en: "ECC Gap Assessment", ar: "تقييم الفجوات مقابل الضوابط الأساسية" } },
  { id: "QIS-RTP-001", phase: "treat", status: "planned", title: { en: "Risk Treatment Plan", ar: "خطة معالجة المخاطر" } },
  { id: "QIS-CHR-001", phase: "govern", status: "review", title: { en: "Cybersecurity Charter and Structure", ar: "ميثاق الأمن السيبراني وهيكله التنظيمي" } },
  { id: "QIS-POL-001", phase: "govern", status: "review", title: { en: "Data Protection Policy", ar: "سياسة حماية البيانات" } },
  { id: "QIS-POL-002", phase: "govern", status: "review", title: { en: "AI Usage Policy and Procedure", ar: "سياسة وإجراء استخدام الذكاء الاصطناعي" } },
  { id: "QIS-IRP-001", phase: "operate", status: "review", title: { en: "Incident Response Plan", ar: "خطة الاستجابة للحوادث السيبرانية" } },
  { id: "QIS-BCP-001", phase: "operate", status: "review", title: { en: "Business Continuity Plan", ar: "خطة استمرارية الأعمال" } },
  { id: "QIS-KPI-001", phase: "operate", status: "review", format: "xlsx", title: { en: "KPI and KRI Dashboard", ar: "لوحة مؤشرات الأداء والمخاطر" } },
  { id: "NAS-HBK-001", phase: "method", status: "review", title: { en: "GRC Methodology Handbook", ar: "دليل منهجيات الحوكمة والمخاطر والالتزام" } },
];

export function documentFile(doc: CaseDocument, lang: "en" | "ar"): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (doc.format === "xlsx") return `${base}/docs/${doc.id}_v1.0.xlsx`;
  return `${base}/docs/${doc.id}_${lang.toUpperCase()}_v1.0.pdf`;
}
