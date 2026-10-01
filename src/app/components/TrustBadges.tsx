import styles from "./TrustBadges.module.css";

const signals = [
  { value: "۱۰", unit: "سال", label: "تجربه در صنعت خودروهای سنگین" },
  { value: "۵۰۰", unit: "+", label: "خودروی سنگین تحویل‌شده" },
  { value: "۲۴", unit: "/۷", label: "پشتیبانی و مشاوره تخصصی" },
  { value: "۱۰۰", unit: "٪", label: "تضمین اصالت و سلامت فنی" },
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
