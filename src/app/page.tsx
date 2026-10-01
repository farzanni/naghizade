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
  const vehicles = getVehicles();
  const featured = vehicles.slice(0, 3);

  /* Point the primary CTA at a listing that actually has stock, so a
     visitor never lands on an empty page. */
  const hasTrucks = vehicles.some((v) => v.group === "trucks");
  const inventoryHref = hasTrucks ? "/trucks" : "/construction";

  return (
    <>
      <Hero inventoryHref={inventoryHref} />

      <ServicesGallery />

      <section
        className={`section ${styles.featured}`}
        aria-labelledby="featured-heading"
      >
        <div className="container">
          <header className={styles.head}>
            <p className="eyebrow">موجودی انبار</p>
            <h2 id="featured-heading" className={styles.title}>
              ناوگان منتخب خودروهای سنگین و ماشین‌آلات
            </h2>
            <p className={styles.lead}>
              خرید، فروش و ثبت سفارش انواع کامیون، کشنده و ماشین‌آلات راه‌سازی با
              ضمانت سلامت و خدمات تخصصی.
            </p>
          </header>

          <VehicleGrid vehicles={featured} />

          {featured.length > 0 && (
            <div className={styles.moreWrap}>
              <Link href={inventoryHref} className="btn btnGhost">
                مشاهده همه خودروها و ماشین‌آلات
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
          <TrustBadges />
        </div>
      </section>

      <section
        id="contact"
        className={`section ${styles.contact}`}
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <div className={styles.contactInner}>
            <header className={styles.contactHead}>
              <h2 id="contact-heading" className={styles.title}>
                درخواست مشاوره و استعلام قیمت
              </h2>
              <p className={styles.lead}>
                شماره تماس و مشخصات خود را ثبت کنید؛ کارشناسان {BUSINESS.name} در
                کوتاه‌ترین زمان با شما تماس خواهند گرفت.
              </p>
            </header>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
