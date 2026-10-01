/* ════════════════════════════════════════════════════════════
   Site-wide business constants.

   Everything a non-developer might need to change lives here:
   phone number, email, address, social links. Components read
   from this file so nothing is hard-coded in the markup.
   ════════════════════════════════════════════════════════════ */

export const SITE_URL = "https://naghizade.vercel.app";

export const BUSINESS = {
  name: "بازرگانی نقی‌زاده",
  shortName: "نقی‌زاده",
  tagline: "مرجع تخصصی خودروهای سنگین و کشنده",

  /**
   * Contact details.
   * NOTE: replace `phone` / `phoneHref` with the real business number
   * before sharing the site publicly. Digits are Persian for display,
   * phoneHref must be plain ASCII digits for tel: links to work.
   */
  phone: "۰۹۱۲۳۴۵۶۷۸۹",
  phoneHref: "+989123456789",
  email: "info@naghizade.ir",

  address: "تهران، ایران",
  hours: "شنبه تا پنجشنبه، ۹ تا ۱۸",
} as const;

/** Convert Persian digits to ASCII so they work in tel:/wa.me links. */
export function toAsciiDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

export const NAV_LINKS = [
  { label: "خانه", href: "/" },
  { label: "کامیون و کشنده", href: "/trucks" },
  { label: "ماشین‌آلات راه‌سازی", href: "/construction" },
  { label: "تماس و مشاوره", href: "/#contact" },
] as const;
