"use client";

import { useLanguage } from "./LanguageProvider";

/* Map of QIS as the company profile (QIS-PRF-001, sections 3 to 6 and 9) describes it:
   people and reporting lines, QIS's own systems, and how each service line reaches the clients. */

type Lang = "en" | "ar";
type Text = Record<Lang, string>;
const tx = (en: string, ar: string): Text => ({ en, ar });

const W = 1000;
const H = 1000;

interface Box { x: number; y: number; w: number; h: number }
const people = {
  ceo: { x: 400, y: 58, w: 200, h: 54 },
  cto: { x: 60, y: 150, w: 300, h: 54 },
  sd: { x: 410, y: 150, w: 200, h: 54 },
  cfo: { x: 640, y: 150, w: 160, h: 54 },
  lead: { x: 830, y: 150, w: 150, h: 54 },
  ops: { x: 20, y: 246, w: 110, h: 58 },
  dev: { x: 138, y: 246, w: 118, h: 58 },
  sec: { x: 264, y: 246, w: 150, h: 58 },
  ms: { x: 430, y: 246, w: 160, h: 58 },
  fin: { x: 640, y: 246, w: 160, h: 58 },
};
const hub = { x: 20, y: 372, w: 740, h: 232 };
const sys = {
  identity: { x: 36, y: 408, w: 228, h: 88 },
  endpoints: { x: 276, y: 408, w: 228, h: 88 },
  server: { x: 516, y: 408, w: 228, h: 88 },
  remote: { x: 36, y: 506, w: 228, h: 88 },
  devsys: { x: 276, y: 506, w: 228, h: 88 },
  tools: { x: 516, y: 506, w: 228, h: 88 },
};
const jeddah = { x: 790, y: 424, w: 190, h: 112 };
const cloud = { x: 760, y: 634, w: 220, h: 58 };
const clientY = 790;
const clients = ["A", "B", "C", "D", "E", "F"].map((id, i) => ({ id, box: { x: 20 + i * 163, y: clientY, w: 150, h: 116 } }));

const L = {
  title: tx("QIS at a glance: people, systems and clients", "الشركة في لمحة: الأشخاص والأنظمة والعملاء"),
  caption: tx(
    "Drawn from the company profile (QIS-PRF-001) as QIS stands when the program begins. Red marks a weakness the profile records; the risk register assesses each one.",
    "مرسوم من ملف الشركة (QIS-PRF-001) كما هي الشركة عند بدء البرنامج. يشير اللون الأحمر إلى نقطة ضعف يذكرها الملف، ويقيّم سجل المخاطر كلاً منها.",
  ),
  peopleBand: tx("People and reporting lines", "الأشخاص وخطوط التبعية"),
  hubBand: tx("QIS's own systems: the hub that reaches every client", "أنظمة الشركة: المحور الذي يصل إلى كل العملاء"),
  scope: tx("QIS · in scope", "الشركة · ضمن النطاق"),
  clientsBand: tx("Six government clients · their own systems are out of scope", "ستة عملاء حكوميين · أنظمتهم الخاصة خارج النطاق"),
  hq: tx("Riyadh headquarters", "المقر الرئيس في الرياض"),
  vpn: tx("Site-to-site VPN to HQ", "VPN بين الموقعين إلى المقر"),
  legend: {
    managed: tx("Managed IT services (remote tool and VPN)", "الخدمات المُدارة (أداة الإدارة عن بُعد وVPN)"),
    hosting: tx("Application hosting (cloud provider)", "استضافة التطبيقات (المزوّد السحابي)"),
    dev: tx("Software development and maintenance", "تطوير البرمجيات وصيانتها"),
    gap: tx("Weakness recorded in the profile", "نقطة ضعف مذكورة في الملف"),
  },
};

const P: Record<keyof typeof people, { t: Text; s?: Text; gap?: Text }> = {
  ceo: { t: tx("Chief Executive Officer", "الرئيس التنفيذي"), s: tx("Faisal Al-Harbi · founder", "فيصل الحربي · المؤسس") },
  cto: { t: tx("Chief Technology Officer", "الرئيس التنفيذي للتقنية"), s: tx("Reem Al-Otaibi · IT, hosting, development, security", "ريم العتيبي · التقنية والاستضافة والتطوير والأمن") },
  sd: { t: tx("Head of Service Delivery", "رئيس تقديم الخدمات"), s: tx("Sultan Al-Dossary", "سلطان الدوسري") },
  cfo: { t: tx("Chief Financial Officer", "الرئيس التنفيذي للمالية"), s: tx("Majed Al-Qahtani", "ماجد القحطاني") },
  lead: { t: tx("Leadership and", "القيادة وتطوير"), s: tx("business development · 12", "الأعمال · 12") },
  ops: { t: tx("IT operations", "العمليات التقنية"), s: tx("and hosting · 40", "والاستضافة · 40") },
  dev: { t: tx("Development · 45", "التطوير · 45"), s: tx("+ 20 contractors", "+ 20 متعاقداً") },
  sec: { t: tx("Cybersecurity · 3", "الأمن السيبراني · 3"), s: tx("2 engineers + GRC Lead", "مهندسان + قائد الحوكمة"), gap: tx("reports to the CTO", "يتبع الرئيس التنفيذي للتقنية") },
  ms: { t: tx("Managed services · 120", "الخدمات المُدارة · 120"), s: tx("helpdesk and remote support", "الدعم الفني والدعم عن بُعد") },
  fin: { t: tx("Finance, HR", "المالية والموارد البشرية"), s: tx("and administration · 30", "والإدارة · 30") },
};

const S: Record<keyof typeof sys, { t: Text; lines: Text[]; gaps?: Text[] }> = {
  identity: { t: tx("Identity", "الهويات"), lines: [tx("Active Directory (2011)", "Active Directory (2011)"), tx("synced to Entra ID · Microsoft 365", "متزامنة مع Entra ID · Microsoft 365")] },
  endpoints: { t: tx("Endpoints", "الأجهزة الطرفية"), lines: [tx("About 300 Windows laptops", "نحو 300 حاسب محمول بنظام Windows")], gaps: [tx("Work email on personal phones", "بريد العمل على هواتف شخصية")] },
  server: { t: tx("Headquarters server room", "غرفة الخوادم في المقر"), lines: [tx("Legacy file server", "خادم ملفات قديم"), tx("Finance and HR system · backup device", "نظام المالية والموارد البشرية · جهاز النسخ")] },
  remote: { t: tx("Client access", "الوصول إلى أنظمة العملاء"), lines: [tx("Remote management tool", "أداة الإدارة عن بُعد"), tx("VPN account per client network", "حساب VPN لكل شبكة عميل")], gaps: [tx("Shared technician accounts", "حسابات مشتركة بين الفنيين")] },
  devsys: { t: tx("Development", "التطوير"), lines: [tx("Code repositories", "مستودعات الشيفرة"), tx("Build pipeline for Client A's portal", "مسار البناء لبوابة العميل (أ)")] },
  tools: { t: tx("Security tools", "الأدوات الأمنية"), lines: [tx("Firewalls · antivirus", "جدران حماية · مكافحة فيروسات")], gaps: [tx("No central logging or monitoring", "لا تسجيل ولا مراقبة مركزية"), tx("MFA not on every system", "التحقق المتعدد ليس على كل الأنظمة")] },
};

const C: Record<string, { label: Text; type: Text; data: Text; tier: Text; lines: ("managed" | "hosting" | "dev")[] }> = {
  A: { label: tx("Client A", "العميل (أ)"), type: tx("Ministry", "وزارة"), data: tx("Citizens' personal data", "بيانات شخصية للمواطنين"), tier: tx("Critical", "حرج"), lines: ["managed", "hosting", "dev"] },
  B: { label: tx("Client B", "العميل (ب)"), type: tx("Regulatory authority", "هيئة تنظيمية"), data: tx("Internal records", "سجلات داخلية"), tier: tx("High", "مرتفع"), lines: ["managed"] },
  C: { label: tx("Client C", "العميل (ج)"), type: tx("Public university", "جامعة حكومية"), data: tx("Student records", "سجلات الطلاب"), tier: tx("High", "مرتفع"), lines: ["managed", "hosting"] },
  D: { label: tx("Client D", "العميل (د)"), type: tx("Municipality", "بلدية"), data: tx("Applicant and property data", "بيانات المتقدمين والعقارات"), tier: tx("Medium", "متوسط"), lines: ["hosting"] },
  E: { label: tx("Client E", "العميل (هـ)"), type: tx("Government agency", "جهة حكومية"), data: tx("Network configurations", "إعدادات الشبكات"), tier: tx("Medium", "متوسط"), lines: ["managed"] },
  F: { label: tx("Client F", "العميل (و)"), type: tx("Small authority", "هيئة صغيرة"), data: tx("Limited internal data", "بيانات داخلية محدودة"), tier: tx("Low", "منخفض"), lines: ["dev"] },
};

const LINE = {
  managed: { cls: "stroke-accent", dash: undefined as string | undefined, from: sys.remote },
  hosting: { cls: "stroke-amber", dash: "9 6", from: cloud },
  dev: { cls: "stroke-ink", dash: "2 5", from: sys.devsys },
};

export function QisMap() {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const X = (b: Box) => (ar ? W - b.x - b.w : b.x);
  const cx = (b: Box) => X(b) + b.w / 2;
  const t = (v: Text) => v[lang];

  const elbow = (a: Box, b: Box) => {
    const x1 = cx(a), y1 = a.y + a.h, x2 = cx(b), y2 = b.y, my = (y1 + y2) / 2;
    return `M${x1},${y1} V${my} H${x2} V${y2}`;
  };

  const label = (x: number, y: number, s: string, cls: string, size = 12, weight = 400) => (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={weight} className={cls} style={{ fontFamily: "var(--font-body)" }}>{s}</text>
  );
  const band = (y: number, s: string) => (
    <text x={ar ? W - 24 : 24} y={y} textAnchor="start" fontSize={12} fontWeight={600} className="fill-muted" style={{ fontFamily: "var(--font-label)", letterSpacing: ar ? 0 : "0.04em" }} direction={ar ? "rtl" : "ltr"}>{s}</text>
  );

  return (
    <figure className="card m-0 p-4 sm:p-6">
      <figcaption className="mb-3 grid gap-1">
        <strong className="font-display text-lg text-ink">{t(L.title)}</strong>
        <span className="text-sm text-muted">{t(L.caption)}</span>
      </figcaption>
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[720px]" role="img" aria-label={t(L.title)} direction={ar ? "rtl" : "ltr"}>
          {/* scope boundary around QIS */}
          <rect x={8} y={8} width={W - 16} height={612} rx={14} className="fill-none stroke-line-strong" strokeDasharray="6 6" />
          <text x={ar ? 24 : W - 24} y={30} textAnchor="end" fontSize={12} fontWeight={600} className="fill-accent" style={{ fontFamily: "var(--font-label)" }} direction={ar ? "rtl" : "ltr"}>{t(L.scope)}</text>
          {band(30, t(L.peopleBand))}

          {/* reporting lines */}
          {(["cto", "sd", "cfo", "lead"] as const).map((k) => <path key={k} d={elbow(people.ceo, people[k])} className="fill-none stroke-line-strong" strokeWidth={1.5} />)}
          {(["ops", "dev", "sec"] as const).map((k) => <path key={k} d={elbow(people.cto, people[k])} className={`fill-none ${k === "sec" ? "stroke-crit" : "stroke-line-strong"}`} strokeWidth={k === "sec" ? 2 : 1.5} />)}
          <path d={elbow(people.sd, people.ms)} className="fill-none stroke-line-strong" strokeWidth={1.5} />
          <path d={elbow(people.cfo, people.fin)} className="fill-none stroke-line-strong" strokeWidth={1.5} />

          {(Object.keys(people) as (keyof typeof people)[]).map((k) => {
            const b = people[k], d = P[k], exec = ["ceo", "cto", "sd", "cfo"].includes(k);
            return (
              <g key={k}>
                <rect x={X(b)} y={b.y} width={b.w} height={b.h} rx={8} className={exec ? "fill-accent-soft stroke-accent" : `fill-surface ${d.gap ? "stroke-crit" : "stroke-line-strong"}`} strokeWidth={d.gap ? 2 : 1} />
                {label(cx(b), b.y + (d.gap ? 18 : 23), t(d.t), "fill-ink", exec ? 13 : 11.5, 600)}
                {d.s && label(cx(b), b.y + (d.gap ? 33 : 40), t(d.s), "fill-muted", 11)}
                {d.gap && label(cx(b), b.y + 49, t(d.gap), "fill-crit", 10.5, 600)}
              </g>
            );
          })}

          {/* the hub */}
          {band(352, t(L.hubBand))}
          <rect x={X(hub)} y={hub.y} width={hub.w} height={hub.h} rx={10} className="fill-sunken stroke-line" />
          <text x={ar ? X(hub) + hub.w - 14 : X(hub) + 14} y={hub.y + 22} textAnchor="start" fontSize={11.5} fontWeight={600} className="fill-muted" style={{ fontFamily: "var(--font-label)" }} direction={ar ? "rtl" : "ltr"}>{t(L.hq)}</text>
          {(Object.keys(sys) as (keyof typeof sys)[]).map((k) => {
            const b = sys[k], d = S[k];
            let y = b.y + 22;
            return (
              <g key={k}>
                <rect x={X(b)} y={b.y} width={b.w} height={b.h} rx={8} className={`fill-surface ${d.gaps ? "stroke-crit" : "stroke-line-strong"}`} strokeWidth={d.gaps ? 1.75 : 1} />
                {label(cx(b), y, t(d.t), "fill-ink", 13, 600)}
                {d.lines.map((l) => { y += 17; return <g key={l.en}>{label(cx(b), y, t(l), "fill-muted", 11)}</g>; })}
                {d.gaps?.map((g) => { y += 17; return <g key={g.en}>{label(cx(b), y, `▲ ${t(g)}`, "fill-crit", 11, 600)}</g>; })}
              </g>
            );
          })}
          {/* Jeddah office */}
          <path d={`M${ar ? W - hub.x - hub.w : hub.x + hub.w},${jeddah.y + jeddah.h / 2} H${ar ? X(jeddah) + jeddah.w : X(jeddah)}`} className="stroke-line-strong" strokeDasharray="4 4" strokeWidth={1.5} />
          <rect x={X(jeddah)} y={jeddah.y} width={jeddah.w} height={jeddah.h} rx={8} className="fill-surface stroke-line-strong" />
          {label(cx(jeddah), jeddah.y + 24, ar ? "مكتب جدة" : "Jeddah office", "fill-ink", 13, 600)}
          {label(cx(jeddah), jeddah.y + 44, ar ? "حواسب محمولة وجدار حماية" : "Laptops, firewall", "fill-muted", 11)}
          {label(cx(jeddah), jeddah.y + 61, ar ? "وطابعة · لا خوادم" : "and printer · no servers", "fill-muted", 11)}
          {label(cx(jeddah), jeddah.y + 86, t(L.vpn), "fill-muted", 11)}

          {/* service lines to clients: each line drops to its own lane, runs across, then drops to its clients */}
          {(["managed", "hosting", "dev"] as const).map((ln) => {
            const laneY = { managed: 712, hosting: 734, dev: 756 }[ln];
            const shift = { managed: -36, hosting: 0, dev: 36 }[ln];
            const src = LINE[ln].from;
            const sx = cx(src) + (ln === "hosting" ? 0 : shift / 2);
            const targets = clients.filter(({ id }) => C[id].lines.includes(ln)).map(({ box }) => cx(box) + shift);
            const xs = [sx, ...targets];
            const d = [`M${sx},${src.y + src.h} V${laneY}`, `M${Math.min(...xs)},${laneY} H${Math.max(...xs)}`, ...targets.map((x) => `M${x},${laneY} V${clientY}`)].join(" ");
            return <path key={ln} d={d} className={`fill-none ${LINE[ln].cls}`} strokeWidth={2} strokeDasharray={LINE[ln].dash} strokeLinecap="round" />;
          })}
          {clients.map(({ id, box }) => C[id].lines.map((ln) => (
            <circle key={`${id}-${ln}`} cx={cx(box) + { managed: -36, hosting: 0, dev: 36 }[ln]} cy={clientY} r={3.5} className={{ managed: "fill-accent", hosting: "fill-amber", dev: "fill-ink" }[ln]} />
          )))}

          {/* cloud provider: outside QIS */}
          <rect x={X(cloud)} y={cloud.y} width={cloud.w} height={cloud.h} rx={8} className="fill-amber-soft stroke-amber" />
          {label(cx(cloud), cloud.y + 25, ar ? "مزوّد الخدمات السحابية" : "Cloud provider", "fill-ink", 13, 600)}
          {label(cx(cloud), cloud.y + 44, ar ? "مرخّص من هيئة الاتصالات · داخل المملكة" : "CST-licensed, inside the Kingdom", "fill-muted", 11)}

          {/* clients */}
          {band(clientY + 140, t(L.clientsBand))}
          {clients.map(({ id, box }) => {
            const c = C[id];
            return (
              <g key={id}>
                <rect x={X(box)} y={box.y} width={box.w} height={box.h} rx={8} className="fill-surface stroke-line-strong" />
                {label(cx(box), box.y + 22, t(c.label), "fill-ink", 13, 700)}
                {label(cx(box), box.y + 40, t(c.type), "fill-muted", 11)}
                {label(cx(box), box.y + 58, t(c.data), "fill-muted", 10.5)}
                <rect x={cx(box) - 34} y={box.y + 74} width={68} height={22} rx={11} className="fill-sunken" />
                {label(cx(box), box.y + 89, t(c.tier), "fill-ink", 11, 600)}
              </g>
            );
          })}

          {/* legend */}
          {([
            ["managed", "stroke-accent", undefined],
            ["hosting", "stroke-amber", "9 6"],
            ["dev", "stroke-ink", "2 5"],
          ] as const).map(([k, cls, dash], i) => {
            const lx = ar ? W - 24 - i * 330 : 24 + i * 330;
            return (
              <g key={k}>
                <line x1={lx} x2={ar ? lx - 34 : lx + 34} y1={962} y2={962} className={cls} strokeWidth={2.5} strokeDasharray={dash} strokeLinecap="round" />
                <text x={ar ? lx - 44 : lx + 44} y={966} fontSize={11.5} className="fill-ink" textAnchor="start" direction={ar ? "rtl" : "ltr"} style={{ fontFamily: "var(--font-body)" }}>{t(L.legend[k])}</text>
              </g>
            );
          })}
          <text x={ar ? W - 24 : 24} y={988} fontSize={11.5} fontWeight={600} className="fill-crit" textAnchor="start" direction={ar ? "rtl" : "ltr"} style={{ fontFamily: "var(--font-body)" }}>{`▲ ${t(L.legend.gap)}`}</text>
        </svg>
      </div>
    </figure>
  );
}
