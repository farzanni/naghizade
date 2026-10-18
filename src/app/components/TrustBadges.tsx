import styles from "./TrustBadges.module.css";

/* ════════════════════════════════════════════════════════════
   Trust signals — real business numbers, not inflated claims.

   Each stat is a small card with a crimson accent line, matching
   the hairline-dash motif used across the site (section eyebrows,
   detail-page block titles) so the section reads as part of the
   same design system rather than a bolt-on widget.
   ════════════════════════════════════════════════════════════ */

const signals = [
  { value: "۳", unit: "+", label: "سال سابقه فعال در واردات و عرضه" },
  { value: "۱۰۰", unit: "+", label: "دستگاه وارداتی تحویل‌شده به پروژه‌ها" },
  { value: "۲۴", unit: "/۷", label: "پشتیبانی و مشاوره تخصصی فنی" },
  { value: "۱۰۰", unit: "٪", label: "تضمین اصالت و سلامت فنی دستگاه" },
] as const;

export default function TrustBadges() {
  return (
    <dl className={styles.grid}>
      {signals.map((s) => (
        <div key={s.label} className={styles.col}>
          <dt className={styles.number}>
            <span className={styles.value}>{s.value}</span>
            <span className={styles.unit}>{s.unit}</span>
          </dt>
          <dd className={styles.label}>{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
