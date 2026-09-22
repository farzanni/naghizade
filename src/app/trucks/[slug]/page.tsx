import { getVehicle, getVehicles } from "@/lib/vehicles";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  const vehicles = getVehicles();
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return {};
  return {
    title: vehicle.name,
    description: vehicle.shortDescription,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.description,
    image: vehicle.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: "",
      availability: vehicle.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: "40px",
              alignItems: "start",
            }}
          >
            {/* Main content */}
            <div>
              {/* Main image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  background: "var(--color-surface-2)",
                  marginBottom: "16px",
                }}
              >
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>

              {/* Thumbnail gallery */}
              {vehicle.images && vehicle.images.length > 1 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${Math.min(vehicle.images.length, 4)}, 1fr)`,
                    gap: "8px",
                    marginBottom: "32px",
                  }}
                >
                  {vehicle.images.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        paddingTop: "66.67%",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        background: "var(--color-surface-2)",
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${vehicle.name} - تصویر ${i + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <p
                className="text-muted"
                style={{
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                {vehicle.category}
              </p>
              <h1
                style={{
                  fontSize: "2.4rem",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: "16px",
                }}
              >
                {vehicle.name}
              </h1>
              <p
                className="text-muted"
                style={{ fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "32px" }}
              >
                {vehicle.description}
              </p>

              {/* Videos */}
              {vehicle.videos && vehicle.videos.length > 0 && (
                <>
                  <h2
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      marginBottom: "16px",
                    }}
                  >
                    ویدیو
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "16px",
                      marginBottom: "32px",
                    }}
                  >
                    {vehicle.videos.map((video, i) => (
                      <video
                        key={i}
                        controls
                        preload="metadata"
                        style={{
                          width: "100%",
                          borderRadius: "var(--radius-sm)",
                          background: "#000",
                        }}
                      >
                        <source src={video} type="video/mp4" />
                      </video>
                    ))}
                  </div>
                </>
              )}

              {/* Specs grid */}
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                مشخصات فنی
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "16px",
                }}
              >
                {Object.entries(vehicle.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      padding: "16px",
                    }}
                  >
                    <p
                      className="text-muted"
                      style={{ fontSize: "0.8rem", marginBottom: "4px" }}
                    >
                      {key}
                    </p>
                    <p style={{ fontWeight: 600 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky CTA card */}
            <div
              style={{
                position: "sticky",
                top: "100px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "32px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <p
                className="text-muted"
                style={{ fontSize: "0.85rem", marginBottom: "8px" }}
              >
                قیمت و مشاوره
              </p>
              <p
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  marginBottom: "24px",
                }}
              >
                تماس بگیرید
              </p>
              <Link
                href="/#contact"
                className="btn btn-primary"
                style={{ width: "100%", fontSize: "1.05rem", padding: "14px" }}
              >
                استعلام قیمت و مشاوره خرید
              </Link>
              <p
                className="text-muted"
                style={{ fontSize: "0.8rem", marginTop: "12px", textAlign: "center" }}
              >
                جهت دریافت مشاوره تخصصی، شرایط پرداخت و هماهنگی بازدید حضوری با ما تماس بگیرید.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
