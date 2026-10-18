import { getVehicle, getVehicles } from "@/lib/vehicles";
import { SITE_URL, BUSINESS, WHATSAPP_URL } from "@/lib/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Gallery from "./Gallery";
import styles from "./Vehicle.module.css";

export async function generateStaticParams() {
  return getVehicles().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return { title: "موردی یافت نشد" };

  return {
    title: vehicle.name,
    description: vehicle.shortDescription || vehicle.description,
    alternates: { canonical: `/machinery/${vehicle.slug}` },
    openGraph: {
      title: `${vehicle.name} | ${BUSINESS.name}`,
      description: vehicle.shortDescription || vehicle.description,
      images: vehicle.image ? [{ url: vehicle.image }] : undefined,
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);

  if (!vehicle) notFound();

  const specs = Object.entries(vehicle.specifications);

  /* JSON-LD: Product & BreadcrumbList schemas */
  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.description || vehicle.shortDescription,
    category: vehicle.category,
    brand: {
      "@type": "Brand",
      name: vehicle.specifications["برند"] ?? BUSINESS.name,
    },
    ...(vehicle.image && { image: `${SITE_URL}${vehicle.image}` }),
    ...(specs.length > 0 && {
      additionalProperty: specs.map(([key, value]) => ({
        "@type": "PropertyValue",
        name: key,
        value,
      })),
    }),
    offers: {
      "@type": "Offer",
      availability: vehicle.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "IRR",
      url: `${SITE_URL}/machinery/${vehicle.slug}`,
      seller: {
        "@type": "Organization",
        name: BUSINESS.name,
        telephone: BUSINESS.phoneHref,
      },
      ...(vehicle.price.trim() && { price: vehicle.price.trim() }),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "خانه",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "کاتالوگ ماشین‌آلات",
        item: `${SITE_URL}/machinery`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.name,
        item: `${SITE_URL}/machinery/${vehicle.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className={`section ${styles.page}`}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="مسیر صفحه">
            <Link href="/">خانه</Link>
            <span aria-hidden="true">/</span>
            <Link href="/machinery">کاتالوگ ماشین‌آلات</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{vehicle.name}</span>
          </nav>

          <div className={styles.layout}>
            {/* ── Main column ── */}
            <div className={styles.main}>
              <Gallery images={vehicle.images} name={vehicle.name} />

              <header className={styles.header}>
                {vehicle.category && (
                  <p className={styles.category}>{vehicle.category}</p>
                )}
                <h1 className={styles.title}>{vehicle.name}</h1>
                {vehicle.description && (
                  <p className={styles.description}>{vehicle.description}</p>
                )}
              </header>

              {specs.length > 0 && (
                <section className={styles.block} aria-labelledby="specs-heading">
                  <h2 id="specs-heading" className={styles.blockTitle}>
                    مشخصات فنی
                  </h2>
                  <dl className={styles.specs}>
                    {specs.map(([key, value]) => (
                      <div key={key} className={styles.spec}>
                        <dt className={styles.specKey}>{key}</dt>
                        <dd className={styles.specValue}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {vehicle.videos.length > 0 && (
                <section className={styles.block} aria-labelledby="video-heading">
                  <h2 id="video-heading" className={styles.blockTitle}>
                    ویدیو
                  </h2>
                  <div className={styles.videos}>
                    {vehicle.videos.map((video, i) => (
                      <video
                        key={video}
                        className={styles.video}
                        controls
                        preload="none"
                        playsInline
                        poster={video.replace(/\.mp4$/, "-poster.jpg")}
                        aria-label={`ویدیو ${i + 1} از ${vehicle.name}`}
                      >
                        <source src={video} type="video/mp4" />
                        مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                      </video>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── Sticky CTA ── */}
            <aside className={styles.aside} aria-labelledby="cta-heading">
              <div className={styles.ctaCard}>
                <p className={styles.ctaLabel}>قیمت و مشاوره</p>
                <p id="cta-heading" className={styles.ctaHeadline}>
                  {vehicle.price.trim() ? vehicle.price : "تماس بگیرید"}
                </p>

                <div className={styles.ctaButtons}>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btnPrimary btnBlock`}
                  >
                    تماس واتساپ با کارشناس
                  </a>
                  <Link href="/#contact" className="btn btnGhost btnBlock">
                    ثبت درخواست مشاوره
                  </Link>
                </div>

                <p className={styles.ctaNote}>
                  جهت دریافت مشاوره تخصصی، شرایط پرداخت و هماهنگی بازدید حضوری با
                  ما تماس بگیرید.
                </p>

                <dl className={styles.ctaMeta}>
                  <div>
                    <dt>ساعات پاسخگویی</dt>
                    <dd>{BUSINESS.hours}</dd>
                  </div>
                  <div>
                    <dt>وضعیت</dt>
                    <dd>{vehicle.available ? "موجود" : "ناموجود"}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
