import { getVehiclesByGroup } from "@/lib/vehicles";
import VehicleGrid from "../components/VehicleGrid";
import styles from "./Listing.module.css";

export const metadata = {
  title: "خرید و فروش انواع کامیون و کشنده",
  description:
    "مشاهده مشخصات فنی و کارشناسی انواع کامیون، کشنده اروپایی و چینی و کامیونت با ضمانت اصالت و سلامت فنی.",
};

export default function TrucksPage() {
  const trucks = getVehiclesByGroup("trucks");

  return (
    <section className={`section ${styles.page}`}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">دسته‌بندی محصولات</p>
          <h1 className={styles.title}>انواع کامیون، کشنده و کامیونت</h1>
          <p className={styles.lead}>
            مجموعه‌ای از برترین کشنده‌ها، کامیون‌های باری و کمپرسی و کامیونت‌های
            کارشناسی‌شده آماده تحویل.
          </p>
          {trucks.length > 0 && (
            <p className={styles.count}>{trucks.length} مورد موجود</p>
          )}
        </header>

        <VehicleGrid vehicles={trucks} />
      </div>
    </section>
  );
}
