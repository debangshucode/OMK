import GridMotion from "@/components/gridmotion";
import AboutUs from "@/components/aboutUS";
import { customItems } from "@/data";

export default function HomePage() {
  return (
    <main className="">
      <GridMotion items={customItems} gradientColor="#dc2626" />
      <AboutUs />
    </main>
  );
}