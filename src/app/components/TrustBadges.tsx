import styles from "./TrustBadges.module.css";

const signals = [
  { value: "۱۰", unit: "سال", label: "تجربه در واردات ماشین‌آلات راه‌سازی و معدنی" },
  { value: "۵۰۰", unit: "+", label: "دستگاه ماشین‌آلات تحویل‌شده به پروژه‌ها" },
  { value: "۲۴", unit: "/۷", label: "پشتیبانی و مشاوره تخصصی فنی" },
  { value: "۱۰۰", unit: "٪", label: "تضمین اصالت و سلامت فنی دستگاه" },
];

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
