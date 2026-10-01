import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const SITE_URL = "https://naghizade.vercel.app";
const SITE_NAME = "بازرگانی نقی‌زاده";
const SITE_DESC =
  "مرجع تخصصی خرید، فروش، واردات و ترخیص انواع خودروهای سنگین، کشنده‌های اروپایی و چینی، و ماشین‌آلات راه‌سازی و معدنی با ضمانت سلامت و کارشناسی فنی.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | مرجع تخصصی خودروهای سنگین و کشنده`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "خودروهای سنگین",
    "کشنده",
    "کامیون",
    "بیل مکانیکی",
    "ماشین‌آلات راه‌سازی",
    "واردات خودرو سنگین",
    "ترخیص خودرو سنگین",
    "بازرگانی نقی‌زاده",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | مرجع تخصصی خودروهای سنگین و کشنده`,
    description: SITE_DESC,
    images: [
      {
        url: "/images/assets/hero-logistics-1280.jpg",
        width: 1280,
        height: 720,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | مرجع تخصصی خودروهای سنگین و کشنده`,
    description: SITE_DESC,
    images: ["/images/assets/hero-logistics-1280.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#08060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skipLink">
          پرش به محتوای اصلی
        </a>
        <NavBar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
