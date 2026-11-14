export type Phase = "context" | "identify" | "assess" | "treat" | "govern" | "operate" | "method";
export type Lang = "en" | "ar";

export interface DocumentVersion {
  version: string;
  date: string;
  note: { en: string; ar: string };
  /** Languages this version exists in. Defaults to both. */
  langs?: Lang[];
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
      { version: "0.4", date: "2026-11-11", langs: ["ar"], note: { en: "Arabic: Arabic-Indic numerals and NCA control-number order", ar: "اعتماد الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },
      { version: "0.3", date: "2026-11-10", note: { en: "New visual identity, classification and sharing markings", ar: "الهوية البصرية الجديدة، ووسوم التصنيف وإشارة المشاركة" } },
      { version: "0.2", date: "2026-11-04", note: { en: "Open items resolved; contractors and the Jeddah office added", ar: "حسم البنود المفتوحة، وإضافة المتعاقدين ومكتب جدة" } },
      { version: "0.1", date: "2026-10-24", note: first },
    ],
  },
  { id: "QIS-AST-001", phase: "identify", planned: true, versions: [], title: { en: "Asset Inventory", ar: "سجل الأصول" } },
  {
    id: "QIS-RMM-001", phase: "assess",
    title: { en: "Risk Management Methodology", ar: "منهجية إدارة المخاطر" },
    versions: [
      { version: "0.5", date: "2026-11-11", langs: ["ar"], note: { en: "Arabic: Arabic-Indic numerals and NCA control-number order", ar: "اعتماد الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },
      { version: "0.4", date: "2026-11-10", note: { en: "Larger risk matrix scores for legibility", ar: "تكبير أرقام مصفوفة المخاطر لتحسين وضوحها" } },
      { version: "0.3", date: "2026-11-10", note: { en: "New visual identity, classification and sharing markings", ar: "الهوية البصرية الجديدة، ووسوم التصنيف وإشارة المشاركة" } },
      { version: "0.2", date: "2026-11-09", note: catastrophic },
      { version: "0.1", date: "2026-11-04", note: first },
    ],
  },
  {
    id: "QIS-RR-001", phase: "assess", format: "xlsx",
    title: { en: "Risk Register", ar: "سجل المخاطر" },
    versions: [
      { version: "0.5", date: "2026-11-14", note: { en: "Arabic read-me sheet added", ar: "إضافة ورقة «اقرأني» بالعربية" } },
      { version: "0.4", date: "2026-11-13", note: { en: "Arabic sheets: Arabic-Indic numerals and NCA control-number order", ar: "الأوراق العربية: الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },
      { version: "0.3", date: "2026-11-10", note: { en: "New visual identity, classification and sharing markings", ar: "الهوية البصرية الجديدة، ووسوم التصنيف وإشارة المشاركة" } },
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
      { version: "0.4", date: "2026-11-11", langs: ["ar"], note: { en: "Arabic: Arabic-Indic numerals and NCA control-number order", ar: "اعتماد الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },
      { version: "0.3", date: "2026-11-10", note: { en: "New visual identity, classification and sharing markings", ar: "الهوية البصرية الجديدة، ووسوم التصنيف وإشارة المشاركة" } },
      { version: "0.2", date: "2026-11-09", note: catastrophic },
      { version: "0.1", date: "2026-11-05", note: first },
    ],
  },
  {
    id: "QIS-POL-001", phase: "govern",
    title: { en: "Data Protection Policy", ar: "سياسة حماية البيانات" },
    versions: [
      { version: "0.4", date: "2026-11-11", note: { en: "Section 8 quoted word for word from NCA's official ECC-2:2024 text; Arabic uses Arabic-Indic numerals", ar: "نقل نصوص الضوابط في القسم 8 حرفياً من النص الرسمي للهيئة، واعتماد الأرقام الهندية في النسخة العربية" } },
      { version: "0.3", date: "2026-11-10", note: { en: "Section 8 matched to the official ECC-2:2024 text", ar: "مطابقة القسم 8 مع النص الرسمي للضوابط الأساسية ECC-2:2024" } },
      { version: "0.2", date: "2026-11-10", langs: ["ar"], note: { en: "Rebuilt on the full policy template, mapped to ECC and DCC, PDPL alignment added", ar: "إعادة البناء على قالب السياسة الكامل، وربط البنود بالضوابط الأساسية وضوابط البيانات، وإضافة المواءمة مع نظام حماية البيانات الشخصية" } },
      { version: "0.1", date: "2026-11-05", note: first },
    ],
  },
  {
    id: "QIS-PRC-001", phase: "govern",
    title: { en: "Data Protection Procedure", ar: "إجراءات حماية البيانات" },
    versions: [
      { version: "0.3", date: "2026-11-11", note: { en: "Reference to policy v0.4; Arabic uses Arabic-Indic numerals and NCA control-number order", ar: "تحديث الإحالة إلى الإصدار 0.4 من السياسة، واعتماد الأرقام الهندية في النسخة العربية" } },
      { version: "0.2", date: "2026-11-10", note: { en: "References updated to the ECC-2:2024 numbering", ar: "تحديث الإحالات وفق ترقيم الإصدار 2024 من الضوابط الأساسية" } },
      { version: "0.1", date: "2026-11-10", langs: ["ar"], note: { en: "First draft: five procedures from contract review to secure disposal", ar: "المسودة الأولى: خمسة إجراءات من مراجعة العقود إلى الإتلاف الآمن" } },
    ],
  },
  {
    id: "QIS-POL-002", phase: "govern",
    title: { en: "AI Usage Policy", ar: "سياسة استخدام الذكاء الاصطناعي" },
    versions: [
      { version: "0.6", date: "2026-11-11", langs: ["ar"], note: { en: "Arabic: Arabic-Indic numerals and NCA control-number order", ar: "اعتماد الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },
      { version: "0.5", date: "2026-11-10", note: { en: "Change-log fix, centred classification badge, new company name", ar: "تصحيح سجل التعديلات، وتوسيط شارة التصنيف، واعتماد اسم الشركة الجديد" } },
      { version: "0.4", date: "2026-11-09", langs: ["ar"], note: { en: "New visual identity, readability, and NCA's four sharing levels", ar: "الهوية البصرية الجديدة، وتحسين القراءة، ومستويات إشارة المشاركة الأربعة المعتمدة لدى الهيئة" } },
      { version: "0.3", date: "2026-11-09", langs: ["ar"], note: { en: "Rebuilt on the full policy template; steps moved to QIS-PRC-002", ar: "إعادة البناء على قالب السياسة الكامل، ونقل الخطوات إلى QIS-PRC-002" } },
      { version: "0.2", date: "2026-11-09", langs: ["ar"], note: { en: "Classification badge, watermark and sharing signal added", ar: "إضافة شارة التصنيف والعلامة المائية وإشارة المشاركة" } },
      { version: "0.1", date: "2026-11-05", note: first },
    ],
  },
  {
    id: "QIS-PRC-002", phase: "govern",
    title: { en: "AI Usage Procedure", ar: "إجراءات استخدام الذكاء الاصطناعي" },
    versions: [
      { version: "0.4", date: "2026-11-11", langs: ["ar"], note: { en: "Arabic: Arabic-Indic numerals and NCA control-number order", ar: "اعتماد الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },
      { version: "0.3", date: "2026-11-10", note: { en: "Centred classification badge and new company name", ar: "توسيط شارة التصنيف واعتماد اسم الشركة الجديد" } },
      { version: "0.2", date: "2026-11-09", langs: ["ar"], note: { en: "New visual identity, readability, and NCA's four sharing levels", ar: "الهوية البصرية الجديدة، وتحسين القراءة، ومستويات إشارة المشاركة الأربعة المعتمدة لدى الهيئة" } },
      { version: "0.1", date: "2026-11-09", langs: ["ar"], note: { en: "First draft: five procedures from request to safe shutdown", ar: "المسودة الأولى: خمسة إجراءات من الطلب إلى الإيقاف الآمن" } },
    ],
  },
  {
    id: "QIS-IRP-001", phase: "operate",
    title: { en: "Incident Response Plan", ar: "خطة الاستجابة للحوادث السيبرانية" },
    versions: [
      { version: "0.4", date: "2026-11-11", note: { en: "English: appendices start on their own pages. Arabic: Arabic-Indic numerals and NCA control-number order", ar: "الإنجليزية: كل ملحق يبدأ في صفحة مستقلة. العربية: الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },
      { version: "0.3", date: "2026-11-10", note: { en: "New visual identity, classification and sharing markings", ar: "الهوية البصرية الجديدة، ووسوم التصنيف وإشارة المشاركة" } },
      { version: "0.2", date: "2026-11-09", note: { en: "NCA deadline source updated; breach notice now covers every personal data breach", ar: "تحديث مصدر مهلة إبلاغ الهيئة، والإبلاغ عن كل تسرب للبيانات الشخصية" } },
      { version: "0.1", date: "2026-11-05", note: first },
    ],
  },
  {
    id: "QIS-BCP-001", phase: "operate",
    title: { en: "Business Continuity Plan", ar: "خطة استمرارية الأعمال" },
    versions: [
      { version: "0.4", date: "2026-11-11", langs: ["ar"], note: { en: "Arabic: Arabic-Indic numerals and NCA control-number order", ar: "اعتماد الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },
      { version: "0.3", date: "2026-11-10", note: { en: "New visual identity, classification and sharing markings", ar: "الهوية البصرية الجديدة، ووسوم التصنيف وإشارة المشاركة" } },
      { version: "0.2", date: "2026-11-09", note: catastrophic },
      { version: "0.1", date: "2026-11-05", note: first },
    ],
  },
  {
    id: "QIS-KPI-001", phase: "operate", format: "xlsx",
    title: { en: "KPI and KRI Dashboard", ar: "لوحة مؤشرات الأداء والمخاطر" },
    versions: [
      { version: "0.6", date: "2026-11-14", note: { en: "Arabic read-me sheet added", ar: "إضافة ورقة «اقرأني» بالعربية" } },
      { version: "0.5", date: "2026-11-14", note: { en: "Arabic trends sheet reads right to left", ar: "ورقة الاتجاهات العربية من اليمين إلى اليسار" } },
      { version: "0.4", date: "2026-11-13", note: { en: "Arabic sheets: Arabic-Indic numerals and NCA control-number order", ar: "الأوراق العربية: الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },
      { version: "0.3", date: "2026-11-10", note: { en: "New visual identity, classification and sharing markings", ar: "الهوية البصرية الجديدة، ووسوم التصنيف وإشارة المشاركة" } },
      { version: "0.2", date: "2026-11-09", note: catastrophic },
      { version: "0.1", date: "2026-11-05", note: { en: "First draft with six months of illustrative data", ar: "المسودة الأولى ببيانات توضيحية لستة أشهر" } },
    ],
  },
  {
    id: "NAS-HBK-001", phase: "method",
    title: { en: "GRC Methodology Handbook", ar: "دليل منهجيات الحوكمة والمخاطر والالتزام" },
    versions: [
      { version: "0.3", date: "2026-11-11", langs: ["ar"], note: { en: "Arabic: Arabic-Indic numerals and NCA control-number order", ar: "اعتماد الأرقام الهندية وترتيب أرقام الضوابط المتبع لدى الهيئة" } },{ version: "0.2", date: "2026-11-10", note: { en: "New visual identity, classification and sharing markings", ar: "الهوية البصرية الجديدة، ووسوم التصنيف وإشارة المشاركة" } }, { version: "0.1", date: "2026-11-07", note: { en: "First draft: seven chapters written, three outlined", ar: "المسودة الأولى: سبعة فصول مكتوبة وثلاثة هياكل" } }],
  },
];

export const isFinal = (v: DocumentVersion) => parseFloat(v.version) >= 1;

export function versionFile(doc: CaseDocument, v: DocumentVersion, lang: Lang): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (doc.format === "xlsx") return `${base}/docs/${doc.id}_v${v.version}.xlsx`;
  return `${base}/docs/${doc.id}_${fileLang(v, lang).toUpperCase()}_v${v.version}.pdf`;
}

/** The language a version is shown in: the page language when it exists, otherwise the first available. */
export function fileLang(v: DocumentVersion, lang: Lang): Lang {
  const langs = v.langs ?? ["ar", "en"];
  return langs.includes(lang) ? lang : langs[0];
}
