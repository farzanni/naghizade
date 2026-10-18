/* ════════════════════════════════════════════════════════════
   Site-wide business constants.

   Everything a non-developer might need to change lives here.
   Components read from this file so nothing is hard-coded in the
   markup.

   The owner is an Iranian national based in China, so the Iranian
   number is reached over WhatsApp — a direct tel: call would be an
   international call. Keep `whatsApp` in ASCII (country code +
   number, no separators) for wa.me links to resolve.
   ════════════════════════════════════════════════════════════ */

export const SITE_URL = "https://naghizade.vercel.app";

export const BUSINESS = {
  name: "بازرگانی نقی‌زاده",
  shortName: "نقی‌زاده",
  tagline: "مرجع تخصصی واردات، خرید و فروش ماشین‌آلات راه‌سازی، معدنی و ساختمانی",

  /** Iranian number — displayed in Persian digits. */
  phone: "۰۹۳۳۷۱۸۸۲۲۵",
  /** Same number, ASCII, for tel: links. */
  phoneHref: "+989337188225",
  /** Same number for WhatsApp deep links. */
  whatsApp: "989337188225",

  /** China office — direct tel: works from a Chinese carrier. */
  chinaPhone: "+8615529232132",

  email: "naghizadeh.mohammad79@yahoo.com",

  address: "陕西省西安市雁塔区悦文路",
  hours: "۲۴/۷ در خدمت",

  /** Office location on Google Maps. */
  officeLocationUrl: "https://maps.app.goo.gl/Ffzx3akGFHdfP1nj6",
} as const;

/** tel: URL for the Iranian number — used across the site. */
export const PHONE_TEL = `tel:${BUSINESS.phoneHref}`;

/** tel: URL for the China office. */
export const CHINA_PHONE_TEL = `tel:${BUSINESS.chinaPhone}`;

/**
 * WhatsApp deep link. wa.me opens a chat with the contact; the call
 * action is one tap from there. There is no reliable deep link that
 * starts a call directly, so the chat entry point is the standard
 * approach.
 */
export const WHATSAPP_URL = `https://wa.me/${BUSINESS.whatsApp}`;

export const NAV_LINKS = [
  { label: "خانه", href: "/" },
  { label: "کاتالوگ ماشین‌آلات", href: "/machinery" },
  { label: "تماس و مشاوره", href: "/#contact" },
] as const;
