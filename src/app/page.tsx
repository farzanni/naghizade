import Link from "next/link";
import Hero from "./components/Hero";
import ServicesGallery from "./components/ServicesGallery";
import VehicleGrid from "./components/VehicleGrid";
import LeadForm from "./components/LeadForm";
import TrustBadges from "./components/TrustBadges";
import { getVehicles } from "@/lib/vehicles";

export default function HomePage() {
  const vehicles = getVehicles();
  const featured = vehicles.slice(0, 3);

  return (
    <>
      <Hero />

      <ServicesGallery />

      <section className="section">
        <div className="container">
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 700,
              marginBottom: "12px",
              lineHeight: 1.3,
            }}
          >
            ناوگان منتخب خودروهای سنگین و کشنده‌ها با کارشناسی معتبر
          </h1>
          <p
            className="text-muted"
            style={{
              fontSize: "1.1rem",
              maxWidth: "600px",
              marginBottom: "40px",
            }}
          >
            خرید، فروش و ثبت سفارش انواع کامیون، کشنده و ماشین‌آلات راه‌سازی با ضمانت سلامت و خدمات تخصصی.
          </p>

          <VehicleGrid vehicles={featured} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Link href="/trucks" className="btn btn-ghost">
              مشاهده همه خودروها و ماشین‌آلات ←
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: "60px 0" }}>
        <TrustBadges />
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div
            style={{
              maxWidth: "560px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              درخواست مشاوره و استعلام قیمت
            </h2>
            <p className="text-muted" style={{ marginBottom: "24px" }}>
              شماره تماس و مشخصات خود را ثبت کنید؛ کارشناسان بازرگانی نقی‌زاده در کوتاه‌ترین زمان با شما تماس خواهند گرفت.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
