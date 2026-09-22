"use client";

import Image from "next/image";
import Link from "next/link";

interface Vehicle {
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  shortDescription: string;
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const hasPrice = vehicle.price && vehicle.price.trim().length > 0;

  return (
    <Link href={`/trucks/${vehicle.slug}`} style={{ textDecoration: "none" }}>
      <div className="card" style={{ position: "relative" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "66.67%",
            background: "var(--color-surface-2)",
            overflow: "hidden",
          }}
        >
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>

        <div style={{ padding: "20px" }}>
          <p
            className="text-muted"
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "6px",
            }}
          >
            {vehicle.category}
          </p>
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            {vehicle.name}
          </h3>
          <p
            className="text-muted"
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              marginBottom: "16px",
            }}
          >
            {vehicle.shortDescription}
          </p>
          {hasPrice ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                }}
              >
                {vehicle.price}
              </span>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                مشاهده مشخصات{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-accent)",
                  fontWeight: 600,
                }}
              >
                برای مشاوره و استعلام قیمت تماس بگیرید
              </span>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                مشاهده مشخصات{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default VehicleCard;
