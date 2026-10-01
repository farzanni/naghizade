"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

/* ════════════════════════════════════════════════════════════
   Hero — full-screen, crimson & black, liquid glass panel.

   Composed of small focused sub-components. Entrance motion is
   slow and decelerating: no bounce, no overshoot.
   ════════════════════════════════════════════════════════════ */

const BRAND_WORDS = [
  { text: "بازرگانی تخصصی", large: false },
  { text: "نقی‌زاده", large: true },
] as const;

function HeroBackground() {
  return (
    <div className={styles.bg}>
      <picture>
        <source
          srcSet="
            /images/assets/hero-logistics-768.webp   768w,
            /images/assets/hero-logistics-1280.webp 1280w,
            /images/assets/hero-logistics-1920.webp 1920w,
            /images/assets/hero-logistics-2400.webp 2400w
          "
          sizes="100vw"
          type="image/webp"
        />
        <source
          srcSet="
            /images/assets/hero-logistics-768.jpg   768w,
            /images/assets/hero-logistics-1280.jpg 1280w,
            /images/assets/hero-logistics-1920.jpg 1920w,
            /images/assets/hero-logistics-2400.jpg 2400w
          "
          sizes="100vw"
          type="image/jpeg"
        />
        <img
          className={styles.bgImg}
          src="/images/assets/hero-logistics-1920.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}

function HeroBrand() {
  return (
    <div className={styles.brand}>
      <span className={styles.brandGlow} aria-hidden="true" />
      <h1 id="hero-brand" className={styles.brandHeading}>
        {BRAND_WORDS.map((word, i) => (
          <span
            key={word.text}
            className={`${styles.brandWord} ${
              word.large ? styles.brandWordLarge : ""
            }`}
            style={{ animationDelay: `${0.4 + i * 0.25}s` }}
          >
            {word.text}
          </span>
        ))}
      </h1>
    </div>
  );
}

function HeroPanel({ inventoryHref }: { inventoryHref: string }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelInner}>
        <p className={styles.subtitle}>
          واردات و عرضه تخصصی انواع کشنده، کامیون و ماشین‌آلات راه‌سازی با
          قطعات یدکی اصلی
        </p>

        <div className={styles.ctaRow}>
          <Link
            href={inventoryHref}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            مشاهده کشنده‌ها و کامیون‌ها
          </Link>
          <Link
            href="/#contact"
            className={`${styles.btn} ${styles.btnGlass}`}
          >
            دریافت مشاوره رایگان
          </Link>
        </div>

        <ul className={styles.trustLine}>
          <li>واردات مستقیم و بدون واسطه</li>
          <li>ضمانت سلامت و اصالت</li>
          <li>پشتیبانی تخصصی</li>
        </ul>
      </div>
    </div>
  );
}

export default function Hero({ inventoryHref }: { inventoryHref: string }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-brand">
      <HeroBackground />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div id="hero-brand-wrap">
        <HeroBrand />
      </div>
      <HeroPanel inventoryHref={inventoryHref} />
      <div className={styles.accentRight} aria-hidden="true" />
      <div className={styles.accentLeft} aria-hidden="true" />
    </section>
  );
}
