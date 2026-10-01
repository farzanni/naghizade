import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/lib/vehicles";
import styles from "./VehicleCard.module.css";

/**
 * A single vehicle in a listing grid.
 *
 * The whole card is one link, so the accessible name comes from the
 * heading inside it. The "view details" affordance is decorative —
 * it is not a second nested interactive element.
 */
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const hasPrice = vehicle.price.trim().length > 0;

  return (
    <article className={styles.card}>
      <Link
        href={`/trucks/${vehicle.slug}`}
        className={styles.link}
        aria-label={`${vehicle.name} — مشاهده مشخصات`}
      >
        <div className={styles.media}>
          {vehicle.image ? (
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true" />
          )}

          {!vehicle.available && (
            <span className={styles.badgeUnavailable}>ناموجود</span>
          )}
        </div>

        <div className={styles.body}>
          {vehicle.category && (
            <p className={styles.category}>{vehicle.category}</p>
          )}

          <h3 className={styles.name}>{vehicle.name}</h3>

          {vehicle.shortDescription && (
            <p className={styles.description}>{vehicle.shortDescription}</p>
          )}

          <div className={styles.footer}>
            {hasPrice ? (
              <span className={styles.price}>{vehicle.price}</span>
            ) : (
              <span className={styles.pricePrompt}>استعلام قیمت</span>
            )}

            <span className={styles.more} aria-hidden="true">
              مشخصات
              <ArrowIcon />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
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
