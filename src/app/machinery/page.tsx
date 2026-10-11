import { getVehicles } from "@/lib/vehicles";
import ListingPage from "../components/ListingPage/ListingPage";

export const metadata = {
  title: "کاتالوگ ماشین‌آلات راه‌سازی و معدنی",
  description:
    "مشاهده مشخصات فنی، تصاویر و وضعیت انواع ماشین‌آلات راه‌سازی، معدنی و بیل مکانیکی کوماتسو و کوبلکو با ضمانت سلامت و کارشناسی فنی.",
  alternates: { canonical: "/machinery" },
};

export default function MachineryPage() {
  const vehicles = getVehicles();

  return (
    <ListingPage
      eyebrow="موجودی انبار"
      title="کاتالوگ ماشین‌آلات راه‌سازی و معدنی"
      lead="مجموعه‌ای از برترین ماشین‌آلات راه‌سازی و معدنی، بیل‌های مکانیکی و تجهیزات عمرانی با کارشناسی فنی تخصصی و آماده تحویل."
      vehicles={vehicles}
      countLabel={(n) => `${n} دستگاه موجود`}
    />
  );
}
