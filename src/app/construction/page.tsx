import { getVehiclesByGroup } from "@/lib/vehicles";
import VehicleGrid from "../components/VehicleGrid";
import styles from "./Listing.module.css";

export const metadata = {
  title: "ماشین‌آلات راه‌سازی، معدنی و کشاورزی",
  description:
    "خرید، فروش و واردات انواع ماشین‌آلات راه‌سازی، لودر، گریدر، بیل مکانیکی و تراکتورهای کشاورزی کارشناسی‌شده.",
};

export default function ConstructionPage() {
  const machinery = getVehiclesByGroup("machinery");

  return (
    <section className={`section ${styles.page}`}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">دسته‌بندی محصولات</p>
          <h1 className={styles.title}>
            ماشین‌آلات راه‌سازی، معدنی و کشاورزی
          </h1>
          <p className={styles.lead}>
            مجموعه‌ای از برترین ماشین‌آلات راه‌سازی، بیل مکانیکی، لودر، گریدر و
            تراکتورهای سنگین با برگه کارشناسی.
          </p>
          {machinery.length > 0 && (
            <p className={styles.count}>{machinery.length} مورد موجود</p>
          )}
        </header>

        <VehicleGrid vehicles={machinery} />
      </div>
    </section>
  );
}
