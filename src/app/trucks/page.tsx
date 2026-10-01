import { getVehiclesByGroup, getGroupCounts } from "@/lib/vehicles";
import ListingPage from "../components/ListingPage/ListingPage";

export const metadata = {
  title: "خرید و فروش انواع کامیون و کشنده",
  description:
    "مشاهده مشخصات فنی و کارشناسی انواع کامیون، کشنده اروپایی و چینی و کامیونت با ضمانت اصالت و سلامت فنی.",
  alternates: { canonical: "/trucks" },
};

export default function TrucksPage() {
  const counts = getGroupCounts();

  return (
    <ListingPage
      eyebrow="دسته‌بندی محصولات"
      title="انواع کامیون، کشنده و کامیونت"
      lead="مجموعه‌ای از برترین کشنده‌ها، کامیون‌های باری و کمپرسی و کامیونت‌های کارشناسی‌شده آماده تحویل."
      vehicles={getVehiclesByGroup("trucks")}
      countLabel={(n) => `${n} مورد موجود`}
      fallback={{
        href: "/construction",
        label: "مشاهده ماشین‌آلات راه‌سازی و معدنی",
        count: counts.machinery,
      }}
    />
  );
}
