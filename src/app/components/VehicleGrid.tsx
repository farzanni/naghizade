import type { Vehicle } from "@/lib/vehicles";
import VehicleCard from "./VehicleCard";
import styles from "./VehicleGrid.module.css";

export default function VehicleGrid({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <EmptyIcon />
        <h3 className={styles.emptyTitle}>در حال حاضر موردی موجود نیست</h3>
        <p className={styles.emptyText}>
          موجودی این دسته‌بندی در حال به‌روزرسانی است. برای اطلاع از موجودی
          لحظه‌ای و ثبت سفارش با کارشناسان ما تماس بگیرید.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.grid} role="list">
      {vehicles.map((vehicle) => (
        <li key={vehicle.slug} className={styles.item}>
          <VehicleCard vehicle={vehicle} />
        </li>
      ))}
    </ul>
  );
}

function EmptyIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.emptyIcon}
    >
      <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
