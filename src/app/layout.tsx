import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "بازرگانی نقی‌زاده | مرجع تخصصی خودروهای سنگین و کشنده",
    template: "%s | بازرگانی نقی‌زاده",
  },
  description:
    "مرجع تخصصی خرید، فروش، واردات و ترخیص انواع خودروهای سنگین، کشنده‌های اروپایی و چینی، و ماشین‌آلات راه‌سازی و معدنی با ضمانت سلامت و کارشناسی فنی.",
  metadataBase: new URL("https://flodesk.ir"),
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "بازرگانی نقی‌زاده",
    title: "بازرگانی نقی‌زاده | مرجع تخصصی خودروهای سنگین و کشنده",
    description:
      "مرجع تخصصی خرید، فروش و واردات انواع کامیون، کشنده و ماشین‌آلات راه‌سازی با ضمانت سلامت و کارشناسی فنی.",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-sans: "Vazirmatn", "Tahoma", system-ui, sans-serif;
            --font-display: "Vazirmatn", "Tahoma", sans-serif;
          }
        `}</style>
      </head>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
