"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

/* ---------- sub-components (each < 60 lines) ---------- */

function HeroBackground() {
  return (
    <div className={styles.heroBg}>
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
          className={styles.heroImg}
          src="/images/assets/hero-logistics-1920.jpg"
          alt="بازرگانی نقی‌زاده — خرید، فروش و واردات تخصصی خودروهای سنگین، کشنده و ماشین‌آلات راه‌سازی"
          onLoad={() => {
            const fallback = document.querySelector(`.${styles.heroImgFallbackHidden}`) as HTMLImageElement | null;
            if (fallback) fallback.style.display = "none";
          }}
          onError={() => {
            const fallback = document.querySelector(`.${styles.heroImgFallbackHidden}`) as HTMLImageElement | null;
            if (fallback) fallback.style.display = "block";
          }}
        />
        <img
          className={styles.heroImgFallbackHidden}
          src="/images/assets/hero-logistics-1920.jpg"
          alt=""
          style={{ display: "block" }}
        />
      </picture>
    </div>
  );
}

function HeroOverlay() {
  return <div className={styles.heroOverlay} />;
}

function HeroGlow() {
  return <div className={styles.heroGlow} />;
}

/* ── Brand: word-by-word slamming fly-in from right ── */

const BRAND_WORDS = ["بازرگانی تخصصی", "نقی‌زاده"];

function HeroBrandTop() {
  return (
    <div className={styles.brandTop}>
      <span className={styles.brandTopGlow} />
      {BRAND_WORDS.map((word, i) => (
        <span
          key={i}
          className={`${styles.brandWord} ${i === BRAND_WORDS.length - 1 ? styles.brandWordLarge : ""}`}
          style={{ animationDelay: `${0.8 + i * 0.3}s` }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function HeroSubtitle() {
  return (
    <p className={styles.subtitle}>
      واردات و عرضه تخصصی انواع کشنده، کامیون و ماشین‌آلات راه‌سازی با قطعات یدکی اصلی
    </p>
  );
}

function HeroCTAs() {
  return (
    <div className={styles.ctaRow}>
      <Link href="/trucks" className={`${styles.btn} ${styles.btnPrimary}`}>
        مشاهده کشنده‌ها و کامیون‌ها
      </Link>
      <Link href="/#contact" className={`${styles.btn} ${styles.btnSecondary}`}>
        دریافت مشاوره رایگان
      </Link>
    </div>
  );
}

function HeroTrustLine() {
  return (
    <p className={styles.trustLine}>
      واردات مستقیم و بدون واسطه · ضمانت سلامت و اصالت · پشتیبانی تخصصی
    </p>
  );
}

function HeroGlassPanel() {
  return (
    <div className={styles.heroPanel}>
      <div className={styles.heroPanelContent}>
        <HeroSubtitle />
        <HeroCTAs />
        <HeroTrustLine />
      </div>
    </div>
  );
}

function HeroTopAccents() {
  return (
    <>
      <div className={styles.topAccentRight} />
      <div className={styles.topAccentLeft} />
    </>
  );
}

function HeroTagline() {
  return (
    <div className={styles.tagline}>
      <p className={styles.taglineText}>مرجع تخصصی خودروهای سنگین و کشنده</p>
    </div>
  );
}

/* ---------- main Hero composition ---------- */

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroBackground />
      <HeroOverlay />
      <HeroGlow />
      <HeroBrandTop />
      <HeroGlassPanel />
      <HeroTopAccents />
      <HeroTagline />
    </section>
  );
}
