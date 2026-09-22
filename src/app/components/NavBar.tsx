"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";

const navLinks = [
  { label: "خانه", href: "/" },
  { label: "کامیون و کشنده", href: "/trucks" },
  { label: "ماشین‌آلات راه‌سازی و کشاورزی", href: "/construction" },
  { label: "تماس و مشاوره", href: "/#contact" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <nav className={styles.nav} aria-label="ناوبری اصلی">
        <Link href="/" className={styles.brand} aria-label="بازرگانی نقی‌زاده - صفحه اصلی">
          <span className={styles.brandMark}>نقی‌زاده</span>
          <span className={styles.brandSub}>بازرگانی</span>
        </Link>

        <ul className={`${styles.menu} ${mobileOpen ? styles.menuOpen : ""} ${scrolled ? styles.menuScrolled : ""}`} role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className={styles.link}
                role="menuitem"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={styles.hamburger}
          aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`${styles.bar} ${mobileOpen ? styles.barTop : ""}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barMid : ""}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barBot : ""}`} />
        </button>
      </nav>
    </header>
  );
}
