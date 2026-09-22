import { getVehicles } from "@/lib/vehicles";
import VehicleGrid from "../components/VehicleGrid";

export const metadata = {
  title: "ماشین‌آلات راه‌سازی، معدنی و کشاورزی | بازرگانی نقی‌زاده",
  description:
    "خرید، فروش و واردات انواع ماشین‌آلات راه‌سازی، لودر، گریدر، بیل مکانیکی و تراکتورهای کشاورزی کارشناسی‌شده.",
};

export default function ConstructionPage() {
  const vehicles = getVehicles();
  const construction = vehicles.filter(
    (v) =>
      v.category === "ماشین‌آلات راه‌سازی" ||
      v.category === "تراکتور" ||
      v.category === "ماشین ساختمانی"
  );

  return (
    <>
      <section className="section">
        <div className="container">
          <p
            className="text-muted"
            style={{
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px",
            }}
          >
            دسته‌بندی محصولات
          </p>
          <h1
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            ماشین‌آلات راه‌سازی، معدنی و کشاورزی
          </h1>
          <p className="text-muted" style={{ maxWidth: "520px" }}>
            مجموعه‌ای از برترین ماشین‌آلات راه‌سازی، بیل مکانیکی، لودر، گریدر و تراکتورهای سنگین با برگه کارشناسی.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-surface)", padding: "40px 0" }}>
        <div className="container">
          {construction.length === 0 ? (
            <p className="text-muted" style={{ textAlign: "center" }}>
              در حال حاضر دستگاهی در این دسته‌بندی موجود نیست.
            </p>
          ) : (
            <VehicleGrid vehicles={construction} />
          )}
        </div>
      </section>
    </>
  );
}
