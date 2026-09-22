import { getVehicles } from "@/lib/vehicles";
import VehicleGrid from "../components/VehicleGrid";

export const metadata = {
  title: "خرید و فروش انواع کامیون، کشنده و کامیونت | بازرگانی نقی‌زاده",
  description:
    "مشاهده مشخصات فنی، قیمت روز و کارشناسی انواع کامیون، کشنده اروپایی و چینی و کامیونت با ضمانت اصالت.",
};

export default function TrucksPage() {
  const vehicles = getVehicles();
  const trucks = vehicles.filter(
    (v) =>
      v.category === "کامیون" ||
      v.category === "کشنده" ||
      v.category === "کامیونت"
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
            انواع کامیون، کشنده و کامیونت
          </h1>
          <p className="text-muted" style={{ maxWidth: "520px" }}>
            مجموعه‌ای از برترین کشنده‌ها، کامیون‌های باری و کمپرسی و کامیونت‌های کارشناسی‌شده آماده تحویل.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-surface)", padding: "40px 0" }}>
        <div className="container">
          {trucks.length === 0 ? (
            <p className="text-muted" style={{ textAlign: "center" }}>
              در حال حاضر خودرویی در این دسته‌بندی موجود نیست.
            </p>
          ) : (
            <VehicleGrid vehicles={trucks} />
          )}
        </div>
      </section>
    </>
  );
}
