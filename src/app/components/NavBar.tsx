"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BUSINESS } from "@/lib/site";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape, and lock body scroll while the menu is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      if (href.startsWith("/#")) return false;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
      <nav className={styles.nav} aria-label="ناوبری اصلی">
        <Link
          href="/"
          className={styles.brand}
          aria-label={`${BUSINESS.name} — صفحه اصلی`}
        >
          <span className={styles.brandMark}>{BUSINESS.shortName}</span>
          <span className={styles.brandSub}>بازرگانی تخصصی</span>
        </Link>

        <ul
          id="main-menu"
          className={`${styles.menu} ${mobileOpen ? styles.menuOpen : ""}`}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.link}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a
            href={`tel:${BUSINESS.phoneHref}`}
            className={styles.phone}
            aria-label={`تماس تلفنی با ${BUSINESS.name}`}
          >
            <PhoneIcon />
            <span className={styles.phoneText}>{BUSINESS.phone}</span>
          </a>

          <button
            type="button"
            className={styles.hamburger}
            aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={mobileOpen}
            aria-controls="main-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`${styles.bar} ${mobileOpen ? styles.barTop : ""}`}
            />
            <span
              className={`${styles.bar} ${mobileOpen ? styles.barMid : ""}`}
            />
            <span
              className={`${styles.bar} ${mobileOpen ? styles.barBot : ""}`}
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
