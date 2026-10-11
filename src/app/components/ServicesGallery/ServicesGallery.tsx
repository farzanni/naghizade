"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServicesGallery.module.css";

/* ════════════════════════════════════════════════════════════
   Services gallery — two full-screen stacked sections.

   Design intent: the photograph is the hero. Text sits on a soft
   directional shadow rather than a blanket of black, so the image
   breathes. Crimson is used sparingly — a kicker, a hairline rule,
   the active dot — never as fill.

   Motion: the active image settles slowly from a slight zoom, text
   rises in a staggered sequence, and a hairline progress bar marks
   the autoplay interval. Nothing bounces.
   ════════════════════════════════════════════════════════════ */

const AUTOSLIDE_MS = 7000;
const RESUME_AFTER_MS = 12000;

/** Persian digits, for the slide counter. */
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n: number) =>
  String(n)
    .split("")
    .map((d) => FA_DIGITS[Number(d)] ?? d)
    .join("");

/** Minimum horizontal travel (px) for a touch to count as a swipe. */
const SWIPE_THRESHOLD = 48;

const SECTIONS = [
  {
    id: "services-import",
    heading: "خدمات واردات و ترخیص",
    slides: [
      {
        id: "import",
        kicker: "واردات مستقیم",
        title: "واردات تخصصی ماشین‌آلات راه‌سازی و معدنی",
        body: "واردات مستقیم انواع بیل مکانیکی، لودر، بلدوزر و تجهیزات سنگین راه‌سازی و معدنی بدون واسطه، با کارشناسی فنی و ضمانت اصالت قطعات.",
        image: "/images/services/service-import.jpg",
      },
      {
        id: "customs",
        kicker: "ترخیص گمرکی",
        title: "ترخیص تخصصی ماشین‌آلات از گمرکات کشور",
        body: "انجام کلیه تشریفات گمرکی، ثبت سفارش در سامانه جامع تجارت و ترخیص قطعی ماشین‌آلات سنگین، راه‌سازی و معدنی در کوتاه‌ترین زمان.",
        image: "/images/services/service-customs.jpg",
      },
      {
        id: "plates",
        kicker: "مجوزهای رسمی",
        title: "واردات با مجوزهای رسمی و قانونی",
        body: "امکان ثبت سفارش و ترخیص انواع ماشین‌آلات راه‌سازی و معدنی با رعایت کلیه ضوابط قانونی و مجوزهای بهره‌برداری کارگاهی.",
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
        kicker: "تحویل سراسر کشور",
        title: "حمل و تحویل کلید‌به‌کلید در محل پروژه و معدن",
        body: "بارگیری ایمن با تریلی‌های مخصوص کمرشکن و تحویل مستقیم ماشین‌آلات در محل کارگاه، پروژه عمرانی یا معدن شما در سراسر ایران.",
        image: "/images/services/service-delivery.jpg",
      },
      {
        id: "permits",
        kicker: "استاندارد و صمت",
        title: "اخذ کلیه مجوزهای قانونی و تاییدیه استاندارد",
        body: "انجام کامل مراحل اداری، تاییدیه بازرسی استاندارد و مجوزهای وزارت صمت بدون نیاز به دوندگی مشتریان.",
        image: "/images/services/service-permits.jpg",
      },
      {
        id: "secondhand",
        kicker: "کارکرده و صفر",
        title: "خرید و فروش ماشین‌آلات کارکرده و صفر",
        body: "ارائه انواع بیل مکانیکی، لودر و تجهیزات معدنی کارکرده با کارشناسی دقیق سیستم هیدرولیک، موتور، زیربندی و شاسی.",
        image: "/images/services/service-secondhand.jpg",
      },
      {
        id: "consultation",
        kicker: "مشاوره تخصصی",
        title: "مشاوره تخصصی خرید ماشین‌آلات و استعلام قیمت",
        body: "مشاوره فنی کارشناسان ما جهت انتخاب مناسب‌ترین تناژ و مدل ماشین‌آلات راه‌سازی و معدنی متناسب با شرایط پروژه و بودجه شما.",
        image: "/images/services/service-consult.jpg",
      },
    ],
  },
] as const;

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

  /* Entrance animations are CSS-driven, but a backgrounded or
     throttled tab never advances the animation clock — which would
     leave the copy invisible forever. Reveal the text from JS once
     the entrance window has passed, so content can never be hidden
     by an animation that never runs. */
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 1100);
    return () => clearTimeout(t);
  }, []);

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
      {/* Preloaded backgrounds, cross-faded, slow settle on the active one */}
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

      {/* Directional shadow — deep only where the text sits, so the
          photograph reads. Plus a soft vignette and a bottom ramp for
          the progress bar. */}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.textWrap} key={current.id}>
          <p className={`${styles.kicker} ${entered ? "" : styles.anim}`}>
            <span className={styles.kickerDash} aria-hidden="true" />
            {current.kicker}
          </p>

          <span
            className={`${styles.rule} ${entered ? "" : styles.anim}`}
            aria-hidden="true"
          />

          <h2 className={`${styles.title} ${entered ? "" : styles.anim}`}>
            {current.title}
          </h2>
          <p className={`${styles.body} ${entered ? "" : styles.anim}`}>
            {current.body}
          </p>

          <Link
            href="/#contact"
            className={`${styles.cta} ${entered ? "" : styles.anim}`}
          >
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

      {/* ── Dots: current highlighted, tappable ── */}
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

      {/* ── Slide counter ── */}
      <p className={styles.counter} aria-hidden="true">
        <span className={styles.counterActive}>{toFa(active + 1)}</span>
        <span className={styles.counterSep}>／</span>
        <span>{toFa(total)}</span>
      </p>

      {/* ── Progress bar: fills over one autoplay interval ── */}
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
        {`اسلاید ${toFa(active + 1)} از ${toFa(total)}: ${current.title}`}
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
