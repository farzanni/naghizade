"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServicesGallery.module.css";

/* ════════════════════════════════════════════════════════════
   Services gallery — two full-screen stacked sections.
   Text fades onto the photo (no box). Images preloaded.
   Dots: one large circular active indicator, small white idle.
   Auto-advances every 7s; pauses on hover, focus and interaction.
   RTL: "next" points left, "previous" points right.
   Swipe: touch left/right on mobile.
   ════════════════════════════════════════════════════════════ */

const AUTOSLIDE_MS = 7000;
const RESUME_AFTER_MS = 12000;

const SECTIONS = [
  {
    id: "services-import",
    heading: "خدمات واردات و ترخیص",
    slides: [
      {
        id: "import",
        title: "واردات تخصصی کشنده و ماشین‌آلات سنگین",
        body: "واردات مستقیم انواع کامیون، کشنده‌های اروپایی و چینی و ماشین‌آلات راه‌سازی بدون واسطه، همراه با کارشناسی فنی و ضمانت اصالت.",
        image: "/images/services/service-import.jpg",
      },
      {
        id: "customs",
        title: "ترخیص تخصصی از گمرکات کشور",
        body: "انجام کلیه تشریفات گمرکی، ثبت سفارش و ترخیص قطعی خودروهای سنگین و ماشین‌آلات راه‌سازی در کوتاه‌ترین زمان.",
        image: "/images/services/service-customs.jpg",
      },
      {
        id: "plates",
        title: "واردات با پلاک ملی و گذر موقت",
        body: "امکان ثبت سفارش و واردات انواع کشنده و خودروهای سنگین به صورت پلاک ملی آماده کار یا گذر موقت.",
        image: "/images/services/service-plates.jpg",
      },
    ],
  },
  {
    id: "services-after-sale",
    heading: "خدمات پس از خرید",
    slides: [
      {
        id: "delivery",
        title: "تحویل سریع و تضمینی در سراسر کشور",
        body: "حمل ایمن و تحویل کلید‌به‌کلید انواع خودروهای سنگین و ماشین‌آلات راه‌سازی از گمرک تا محل پروژه شما.",
        image: "/images/services/service-delivery.jpg",
      },
      {
        id: "permits",
        title: "اخذ کلیه مجوزهای قانونی و شماره‌گذاری",
        body: "انجام صفر تا صد مراحل اداری، تاییدیه استاندارد و اخذ پلاک ملی بدون نیاز به دوندگی.",
        image: "/images/services/service-permits.jpg",
      },
      {
        id: "secondhand",
        title: "خرید و فروش خودروهای کارکرده و در حد نو",
        body: "ارائه انواع کامیون، کشنده و ماشین‌آلات کارکرده با کارشناسی دقیق رنگ، فنی و شاسی.",
        image: "/images/services/service-secondhand.jpg",
      },
      {
        id: "consultation",
        title: "مشاوره تخصصی خرید و استعلام قیمت",
        body: "مشاوره تخصصی جهت انتخاب بهترین کشنده یا ماشین‌آلات راه‌سازی متناسب با نوع کاربری و بودجه شما.",
        image: "/images/services/service-consult.jpg",
      },
    ],
  },
] as const;

/** Minimum horizontal travel (px) for a touch to count as a swipe. */
const SWIPE_THRESHOLD = 48;

function FullScreenSection({
  section,
}: {
  section: (typeof SECTIONS)[number];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = section.slides.length;
  const current = section.slides[active];

  const go = useCallback(
    (next: number) => setActive(((next % total) + total) % total),
    [total]
  );

  /** Any deliberate interaction pauses autoplay, then resumes later. */
  const pauseBriefly = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  /** Step one slide. In RTL, +1 advances (moves left), -1 goes back. */
  const step = useCallback(
    (delta: number) => {
      pauseBriefly();
      go(active + delta);
    },
    [pauseBriefly, go, active]
  );

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  // Autoplay — skipped while paused or when reduced motion is preferred.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => go(active + 1), AUTOSLIDE_MS);
    return () => clearInterval(timer);
  }, [go, active, paused]);

  // ── Swipe: touch-left advances, touch-right goes back (mirrors RTL) ──
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - (touchStartY.current ?? 0);

    // Only treat as a swipe when horizontal travel clearly dominates.
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
      step(dx < 0 ? 1 : -1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <section
      className={styles.screen}
      id={section.id}
      aria-label={section.heading}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Preloaded backgrounds, cross-faded */}
      {section.slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`${styles.bg} ${i === active ? styles.bgActive : ""}`}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            sizes="100vw"
            priority={section.id === "services-import" && i === 0}
            className={styles.bgImg}
          />
        </div>
      ))}

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.textWrap} key={current.id}>
          <h2 className={styles.title}>{current.title}</h2>
          <p className={styles.body}>{current.body}</p>
          <Link href="/#contact" className={styles.cta}>
            درخواست مشاوره
          </Link>
        </div>
      </div>

      {/* ── Arrows: RTL order — next on the left, previous on the right ── */}
      <button
        type="button"
        className={`${styles.navBtn} ${styles.navNext}`}
        onClick={() => step(1)}
        aria-label="اسلاید بعدی"
      >
        <span className={styles.navIconNext} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`${styles.navBtn} ${styles.navPrev}`}
        onClick={() => step(-1)}
        aria-label="اسلاید قبلی"
      >
        <span className={styles.navIconPrev} aria-hidden="true" />
      </button>

      {/* ── Dots: current slide highlighted, tappable, with progress bar ── */}
      <div className={styles.dots} role="tablist" aria-label="انتخاب اسلاید">
        {section.slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={slide.title}
            className={`${styles.dot} ${
              i === active ? styles.dotActive : styles.dotIdle
            }`}
            onClick={() => {
              pauseBriefly();
              go(i);
            }}
          />
        ))}
      </div>

      {/* ── Progress bar: fills over the autoplay interval ── */}
      {!paused && (
        <div
          className={styles.progressTrack}
          aria-hidden="true"
          key={`progress-${active}-${section.id}`}
        >
          <div className={styles.progressFill} />
        </div>
      )}

      {/* Announce slide changes to screen readers */}
      <p className={styles.srOnly} aria-live="polite">
        {`اسلاید ${active + 1} از ${total}: ${current.title}`}
      </p>
    </section>
  );
}

export default function ServicesGallery() {
  return (
    <div className={styles.gallery}>
      {SECTIONS.map((section) => (
        <FullScreenSection key={section.id} section={section} />
      ))}
    </div>
  );
}
