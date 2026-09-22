"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServicesGallery.module.css";

/* ════════════════════════════════════════════════════════════
   TWO FULL-SCREEN SECTIONS — stacked vertically
   Text fades in on photos. No box. Glassy rounded buttons.
   Dots: one big circular active, others small white.
   Auto-slide: advances every 5 seconds.
   ════════════════════════════════════════════════════════════ */

const AUTOSLIDE_MS = 5000;

const sections = [
  {
    id: "group-1",
    slides: [
      {
        id: "import",
        title: "واردات تخصصی کشنده و ماشین‌آلات سنگین",
        body: "واردات مستقیم انواع کامیون، کشنده‌های اروپایی و چینی و ماشین‌آلات راه‌سازی بدون واسطه، همراه با کارشناسی فنی و ضمانت اصالت.",
        image: "/images/vehicles/marcin-jozwiak-kGoPcmpPT7c-unsplash.jpg",
      },
      {
        id: "customs",
        title: "ترخیص تخصصی از گمرکات کشور",
        body: "انجام کلیه تشریفات گمرکی، ثبت سفارش و ترخیص قطعی خودروهای سنگین و ماشین‌آلات راه‌سازی در کوتاه‌ترین زمان.",
        image: "/images/vehicles/edwin-rodriguez-UeUc2ei0GOw-unsplash.jpg",
      },
      {
        id: "plates",
        title: "واردات با پلاک ملی و گذر موقت",
        body: "امکان ثبت سفارش و واردات انواع کشنده و خودروهای سنگین به صورت پلاک ملی آماده کار یا گذر موقت.",
        image: "/images/vehicles/zieben-vh-N5EPfCrEuy8-unsplash.jpg",
      },
    ],
  },
  {
    id: "group-2",
    slides: [
      {
        id: "delivery",
        title: "تحویل سریع و تضمینی در سراسر کشور",
        body: "حمل ایمن و تحویل کلید‌به‌کلید انواع خودروهای سنگین و ماشین‌آلات راه‌سازی از گمرک تا محل پروژه شما.",
        image: "/images/vehicles/brian-stalter-arotxe540N4-unsplash.jpg",
      },
      {
        id: "permits",
        title: "اخذ کلیه مجوزهای قانونی و شماره‌گذاری",
        body: "انجام صفر تا صد مراحل اداری، تاییدیه استاندارد و اخذ پلاک ملی بدون نیاز به دوندگی.",
        image: "/images/vehicles/omid-roshan-Evss0Whf5OI-unsplash.jpg",
      },
      {
        id: "secondhand",
        title: "خرید و فروش خودروهای کارکرده و در حد نو",
        body: "ارائه انواع کامیون، کشنده و ماشین‌آلات کارکرده با کارشناسی دقیق رنگ، فنی و شاسی.",
        image: "/images/vehicles/shay-5n2EemBYQm4-unsplash.jpg",
      },
      {
        id: "consultation",
        title: "مشاوره تخصصی خرید و استعلام قیمت",
        body: "مشاوره تخصصی جهت انتخاب بهترین کشنده یا ماشین‌آلات راه‌سازی متناسب با نوع کاربری و بودجه شما.",
        image: "/images/vehicles/gabriel-santos-GBVDilE8yvI-unsplash.jpg",
      },
    ],
  },
];

function FullScreenSection({ section }: { section: typeof sections[number] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const current = section.slides[active];

  const goNext = useCallback(() => {
    setActive((prev) => (prev < section.slides.length - 1 ? prev + 1 : 0));
  }, [section.slides.length]);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev > 0 ? prev - 1 : section.slides.length - 1));
  }, [section.slides.length]);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, AUTOSLIDE_MS);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  // Reset auto-slide timer on manual interaction
  const handleUserInteraction = (action: () => void) => {
    action();
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000); // resume after 8s idle
  };

  return (
    <section className={styles.screen} id={section.id}>
      {/* ── All images preloaded (crossfade), priority on first ── */}
      {section.slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`${styles.bg} ${i === active ? styles.bgActive : ""}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            className={styles.bgImg}
          />
        </div>
      ))}

      {/* ── Dark overlay ── */}
      <div className={styles.overlay} />

      {/* ── Text content — fades in on photo, no box ── */}
      <div className={styles.content}>
        <div className={styles.textWrap} key={current.id}>
          <h2 className={styles.title}>{current.title}</h2>
          <p className={styles.body}>{current.body}</p>
          <Link href="#contact" className={styles.cta}>
            درخواست مشاوره
          </Link>
        </div>
      </div>

      {/* ── Navigation arrows ── */}
      <button
        className={`${styles.navBtn} ${styles.navPrev}`}
        onClick={() => handleUserInteraction(goPrev)}
        aria-label="قبلی"
      />
      <button
        className={`${styles.navBtn} ${styles.navNext}`}
        onClick={() => handleUserInteraction(goNext)}
        aria-label="بعدی"
      />

      {/* ── Dots: one big circular active, others small white ── */}
      <div className={styles.dots}>
        {section.slides.map((slide, i) => (
          <button
            key={slide.id}
            className={`${styles.dot} ${i === active ? styles.dotActive : styles.dotIdle}`}
            aria-label={`اسلاید ${i + 1}`}
            onClick={() => handleUserInteraction(() => setActive(i))}
          />
        ))}
      </div>
    </section>
  );
}

export default function ServicesGallery() {
  return (
    <div className={styles.gallery}>
      {sections.map((section) => (
        <FullScreenSection key={section.id} section={section} />
      ))}
    </div>
  );
}
