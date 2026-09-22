import VehicleCard from "./VehicleCard";

interface Vehicle {
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  shortDescription: string;
}

function VehicleGrid({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
      }}
    >
      {vehicles.map((v) => (
        <VehicleCard key={v.slug} vehicle={v} />
      ))}
    </div>
  );
}

export default VehicleGrid;
