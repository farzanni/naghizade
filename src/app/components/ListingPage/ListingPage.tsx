import Link from "next/link";
import VehicleGrid from "../VehicleGrid";
import type { Vehicle } from "@/lib/vehicles";
import styles from "./ListingPage.module.css";

/* ════════════════════════════════════════════════════════════
   Shared shell for the two listing pages.

   /trucks and /construction render the same structure with
   different content, so the layout lives here once instead of
   being duplicated per route.
   ════════════════════════════════════════════════════════════ */

export default function ListingPage({
  eyebrow,
  title,
  lead,
  vehicles,
  countLabel,
  fallback,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  vehicles: Vehicle[];
  countLabel: (n: number) => string;
  /** Where to send a visitor when this listing has no stock. */
  fallback: { href: string; label: string; count: number };
}) {
  return (
    <section className={`section ${styles.page}`}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
          {vehicles.length > 0 && (
            <p className={styles.count}>{countLabel(vehicles.length)}</p>
          )}
        </header>

        <VehicleGrid vehicles={vehicles} />

        {/* A visitor who lands on an empty listing needs a way out. */}
        {vehicles.length === 0 && fallback.count > 0 && (
          <div className={styles.fallback}>
            <Link href={fallback.href} className="btn btnGhost">
              {fallback.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
