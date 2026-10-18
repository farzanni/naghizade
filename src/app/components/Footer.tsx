import Link from "next/link";
import { BUSINESS, NAV_LINKS, WHATSAPP_URL, CHINA_PHONE_TEL } from "@/lib/site";
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
            مرجع تخصصی خرید، فروش، واردات و ترخیص انواع ماشین‌آلات راه‌سازی، معدنی و
            ساختمانی در ایران.
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
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.listLink}>
                <span className={styles.contactLabel}>واتساپ (ایران):</span>{" "}
                <span dir="ltr">{BUSINESS.phone}</span>
              </a>
            </li>
            <li>
              <a href={CHINA_PHONE_TEL} className={styles.listLink}>
                <span className={styles.contactLabel}>تلفن چین:</span>{" "}
                <span dir="ltr">{BUSINESS.chinaPhone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className={styles.listLink}>
                <span className={styles.contactLabel}>ایمیل:</span>{" "}
                <span dir="ltr">{BUSINESS.email}</span>
              </a>
            </li>
            <li className={styles.contactPlain}>
              <span className={styles.contactLabel}>آدرس دفتر چین:</span>{" "}
              {BUSINESS.address}
            </li>
            <li className={styles.contactPlain}>
              <a href={BUSINESS.officeLocationUrl} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                <PinIcon /> مشاهده روی نقشه ←
              </a>
            </li>
            <li className={styles.contactPlain}>
              <span className={styles.contactLabel}>تلفن چین:</span>{" "}
              <a href={`tel:${BUSINESS.chinaPhone}`} dir="ltr">{BUSINESS.chinaPhone}</a>
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

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
