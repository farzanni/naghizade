import { getVehiclesByGroup } from "@/lib/vehicles";
import ListingPage from "../components/ListingPage/ListingPage";

export const metadata = {
  title: "ماشین‌آلات راه‌سازی، معدنی و کشاورزی",
  description:
    "خرید، فروش و واردات انواع ماشین‌آلات راه‌سازی، لودر، گریدر، بیل مکانیکی و تراکتورهای کشاورزی کارشناسی‌شده.",
  alternates: { canonical: "/construction" },
};

export default function ConstructionPage() {
  const machinery = getVehiclesByGroup("machinery");
  const trucks = getVehiclesByGroup("trucks");

  return (
    <ListingPage
      eyebrow="دسته‌بندی محصولات"
      title="ماشین‌آلات راه‌سازی، معدنی و کشاورزی"
      lead="مجموعه‌ای از برترین ماشین‌آلات راه‌سازی، بیل مکانیکی، لودر، گریدر و تراکتورهای سنگین با برگه کارشناسی."
      vehicles={machinery}
      countLabel={(n) => `${n} مورد موجود`}
      fallback={{
        href: "/trucks",
        label: "مشاهده کامیون‌ها و کشنده‌ها",
        count: trucks.length,
      }}
    />
  );
}
