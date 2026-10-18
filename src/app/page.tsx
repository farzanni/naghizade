import Link from "next/link";
import Hero from "./components/Hero";
import ServicesGallery from "./components/ServicesGallery";
import VehicleGrid from "./components/VehicleGrid";
import LeadForm from "./components/LeadForm";
import TrustBadges from "./components/TrustBadges";
import { getVehicles } from "@/lib/vehicles";
import { BUSINESS, WHATSAPP_URL, CHINA_PHONE_TEL } from "@/lib/site";
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
                    <p className={styles.contactPointLabel}>تماس تلفنی (ایران)</p>
                    <p className={styles.contactPointValue}>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" dir="ltr">
                        {BUSINESS.phone} — واتساپ
                      </a>
                    </p>
                  </div>
                </div>

                <div className={styles.contactPoint}>
                  <span className={styles.contactPointIcon}>
                    <ChinaIcon />
                  </span>
                  <div>
                    <p className={styles.contactPointLabel}>دفتر چین</p>
                    <p className={styles.contactPointValue}>
                      <a href={CHINA_PHONE_TEL} dir="ltr">
                        {BUSINESS.chinaPhone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className={styles.contactPoint}>
                  <span className={styles.contactPointIcon}>
                    <PinIcon />
                  </span>
                  <div>
                    <p className={styles.contactPointLabel}>آدرس دفتر چین</p>
                    <p className={styles.contactPointValue}>{BUSINESS.address}</p>
                    <p className={styles.contactPointValue}>
                      <a
                        href={BUSINESS.officeLocationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        مشاهده روی نقشه ←
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
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsAppCta}
              >
                <WhatsAppIcon />
                تماس از طریق واتساپ
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
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

function ChinaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8h15l-5-5" />
      <path d="M22 16h-15l5 5" />
      <path d="M3 12h18" strokeDasharray="2 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
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
