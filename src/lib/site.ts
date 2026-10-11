/* ════════════════════════════════════════════════════════════
   Site-wide business constants.

   Everything a non-developer might need to change lives here:
   phone number, email, hours. Components read from this file so
   nothing is hard-coded in the markup.

   Before sharing the site publicly, replace `phone` / `phoneHref`
   with the real business number. `phone` is Persian digits for
   display; `phoneHref` must be ASCII digits for tel: links.
   ════════════════════════════════════════════════════════════ */

export const SITE_URL = "https://naghizade.vercel.app";

export const BUSINESS = {
  name: "بازرگانی نقی‌زاده",
  shortName: "نقی‌زاده",
  tagline: "مرجع تخصصی واردات، خرید و فروش ماشین‌آلات راه‌سازی، معدنی و ساختمانی",

  phone: "۰۹۱۲۳۴۵۶۷۸۹",
  phoneHref: "+989123456789",
  email: "info@naghizade.ir",

  address: "تهران، ایران",
  hours: "شنبه تا پنجشنبه، ۹ تا ۱۸",
} as const;

/** tel: URL for the business phone — one source, used everywhere. */
export const PHONE_TEL = `tel:${BUSINESS.phoneHref}`;

export const NAV_LINKS = [
  { label: "خانه", href: "/" },
  { label: "کاتالوگ ماشین‌آلات", href: "/machinery" },
  { label: "تماس و مشاوره", href: "/#contact" },
] as const;
