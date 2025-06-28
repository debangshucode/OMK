import GridMotion from "@/components/gridmotion";
import { customItems } from "@/data";

export default function HomePage() {
  return (
    <main className="">
      <GridMotion items={customItems} gradientColor="#dc2626" />
    </main>
  );
}