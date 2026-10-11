import Link from "next/link";
import Hero from "./components/Hero";
import ServicesGallery from "./components/ServicesGallery";
import VehicleGrid from "./components/VehicleGrid";
import LeadForm from "./components/LeadForm";
import TrustBadges from "./components/TrustBadges";
import { getVehicles } from "@/lib/vehicles";
import { BUSINESS } from "@/lib/site";
import styles from "./Home.module.css";

export default function HomePage() {
  const featured = getVehicles().slice(0, 4);

  return (
    <>
      <Hero inventoryHref="/machinery" />

      <ServicesGallery />

      <section
        className={`section ${styles.featured}`}
        aria-labelledby="featured-heading"
      >
        <div className="container">
          <header className={styles.head}>
            <p className="eyebrow">موجودی انبار</p>
            <h2 id="featured-heading" className={styles.title}>
              ماشین‌آلات منتخب راه‌سازی و معدنی
            </h2>
            <p className={styles.lead}>
              خرید، فروش و ثبت سفارش انواع بیل مکانیکی، لودر و ماشین‌آلات
              راه‌سازی و معدنی با ضمانت سلامت و کارشناسی فنی تخصصی.
            </p>
            <p className={styles.countBadge}>
              {featured.length} دستگاه در موجودی انبار
            </p>
          </header>

          <VehicleGrid vehicles={featured} />

          {featured.length > 0 && (
            <div className={styles.moreWrap}>
              <Link href="/machinery" className={styles.moreCta}>
                مشاهده کاتالوگ کامل
                <ArrowIcon />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section
        className={`sectionTight ${styles.trust}`}
        aria-label="مزیت‌های ما"
      >
        <div className="container">
          <header className={styles.trustHead}>
            <h2 className={styles.trustTitle}>چرا {BUSINESS.name}؟</h2>
          </header>
          <TrustBadges />
        </div>
      </section>

      <section
        id="contact"
        className={`section ${styles.contact}`}
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <div className={styles.contactGrid}>
            <div>
              <header className={styles.contactHead}>
                <p className="eyebrow">تماس و مشاوره</p>
                <h2 id="contact-heading" className={styles.title}>
                  درخواست مشاوره و استعلام قیمت
                </h2>
                <p className={styles.lead}>
                  شماره تماس و مشخصات خود را ثبت کنید؛ کارشناسان {BUSINESS.name}
                  در کوتاه‌ترین زمان با شما تماس خواهند گرفت.
                </p>
              </header>

              <div className={styles.contactPoints}>
                <div className={styles.contactPoint}>
                  <span className={styles.contactPointIcon}>
                    <PhoneIcon />
                  </span>
                  <div>
                    <p className={styles.contactPointLabel}>تماس تلفنی</p>
                    <p className={styles.contactPointValue}>
                      <a href={`tel:${BUSINESS.phoneHref}`} dir="ltr">
                        {BUSINESS.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className={styles.contactPoint}>
                  <span className={styles.contactPointIcon}>
                    <MailIcon />
                  </span>
                  <div>
                    <p className={styles.contactPointLabel}>ایمیل</p>
                    <p className={styles.contactPointValue}>
                      <a href={`mailto:${BUSINESS.email}`} dir="ltr">
                        {BUSINESS.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className={styles.contactPoint}>
                  <span className={styles.contactPointIcon}>
                    <ClockIcon />
                  </span>
                  <div>
                    <p className={styles.contactPointLabel}>ساعات پاسخگویی</p>
                    <p className={styles.contactPointValue}>{BUSINESS.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.contactFormCard}>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
