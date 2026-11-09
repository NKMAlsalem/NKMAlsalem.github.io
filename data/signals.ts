export type Severity = "High" | "Medium" | "Low";

interface SignalText { name: string; control: string; requirement: string; fix: string }

export interface Signal { severity: Severity; evidence: string; en: SignalText; ar: SignalText }

export const signals: Signal[] = [
  {
    severity: "High",
    evidence: 'encryption.status = "off"',
    en: { name: "Disk encryption off", control: "Cryptography", requirement: "Data at rest on endpoints is protected with approved encryption.", fix: "Enable full-disk encryption and confirm recovery keys are escrowed centrally." },
    ar: { name: "تشفير القرص معطل", control: "التشفير", requirement: "حماية البيانات المخزنة على الأجهزة بتشفير معتمد.", fix: "تفعيل تشفير القرص كاملاً والتأكد من حفظ مفاتيح الاستعادة مركزياً." },
  },
  {
    severity: "High",
    evidence: "patch.days_behind = 47",
    en: { name: "OS patches 47 days behind", control: "Vulnerabilities Management", requirement: "Known vulnerabilities are remediated within a defined timeframe.", fix: "Apply pending updates now and enroll the device in automatic patching." },
    ar: { name: "تحديثات النظام متأخرة 47 يوماً", control: "إدارة الثغرات", requirement: "معالجة الثغرات المعروفة خلال مدة محددة.", fix: "تطبيق التحديثات المعلقة الآن وتسجيل الجهاز في التحديث التلقائي." },
  },
  {
    severity: "Medium",
    evidence: "account.local_admin = true",
    en: { name: "Standard user has local admin", control: "Identity and Access Management", requirement: "Access follows least privilege and is reviewed periodically.", fix: "Remove admin rights and grant elevation through an approved request process." },
    ar: { name: "مستخدم عادي بصلاحيات مدير محلي", control: "إدارة هويات الدخول والصلاحيات", requirement: "منح الصلاحيات وفق الحد الأدنى ومراجعتها دورياً.", fix: "سحب صلاحيات المدير ومنح الرفع عبر طلب معتمد." },
  },
  {
    severity: "Medium",
    evidence: "logging.forwarding = false",
    en: { name: "Logs not forwarded", control: "Event Logs and Monitoring Management", requirement: "Security events are collected centrally and monitored.", fix: "Configure log forwarding to the central collector and verify receipt." },
    ar: { name: "السجلات لا تُرسل", control: "إدارة سجلات الأحداث ومراقبة الأمن السيبراني", requirement: "جمع الأحداث الأمنية مركزياً ومراقبتها.", fix: "إعداد إرسال السجلات إلى المجمّع المركزي والتحقق من وصولها." },
  },
  {
    severity: "Medium",
    evidence: "backup.last_success_days = 30",
    en: { name: "No backup in 30 days", control: "Backup and Recovery Management", requirement: "Backups run on schedule and restores are tested.", fix: "Restore the backup schedule and run a test restore of user data." },
    ar: { name: "لا نسخ احتياطي منذ 30 يوماً", control: "إدارة النسخ الاحتياطية", requirement: "تنفيذ النسخ الاحتياطي في موعده واختبار الاستعادة.", fix: "إعادة جدول النسخ واختبار استعادة بيانات المستخدم." },
  },
  {
    severity: "Low",
    evidence: 'usb.mass_storage = "allowed"',
    en: { name: "USB storage allowed", control: "Information System and Processing Facilities Protection", requirement: "Removable media use is restricted and controlled.", fix: "Block mass storage by policy, with documented exceptions." },
    ar: { name: "وسائط USB مسموحة", control: "حماية الأنظمة وأجهزة معالجة المعلومات", requirement: "تقييد استخدام الوسائط القابلة للإزالة وضبطه.", fix: "حظر وسائط التخزين بالسياسة مع توثيق الاستثناءات." },
  },
];
