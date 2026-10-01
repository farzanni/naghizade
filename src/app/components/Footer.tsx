import Link from "next/link";
import { BUSINESS, NAV_LINKS } from "@/lib/site";
import styles from "./Footer.module.css";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand} aria-label={BUSINESS.name}>
            <span className={styles.brandMark}>{BUSINESS.shortName}</span>
            <span className={styles.brandSub}>بازرگانی تخصصی</span>
          </Link>
          <p className={styles.brandText}>
            مرجع تخصصی خرید، فروش، واردات و ترخیص انواع خودروهای سنگین، کشنده و
            ماشین‌آلات راه‌سازی در ایران.
          </p>
        </div>

        <nav className={styles.col} aria-labelledby="footer-nav">
          <h2 id="footer-nav" className={styles.colTitle}>
            دسترسی سریع
          </h2>
          <ul className={styles.list}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.listLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>تماس با ما</h2>
          <ul className={styles.list}>
            <li>
              <a href={`tel:${BUSINESS.phoneHref}`} className={styles.listLink}>
                <span className={styles.contactLabel}>تلفن:</span>{" "}
                <span dir="ltr">{BUSINESS.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className={styles.listLink}>
                <span className={styles.contactLabel}>ایمیل:</span>{" "}
                <span dir="ltr">{BUSINESS.email}</span>
              </a>
            </li>
            <li className={styles.contactPlain}>
              <span className={styles.contactLabel}>ساعات پاسخگویی:</span>{" "}
              {BUSINESS.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>
          تمامی حقوق مادی و معنوی برای {BUSINESS.name} محفوظ است. {YEAR}
        </p>
      </div>
    </footer>
  );
}
