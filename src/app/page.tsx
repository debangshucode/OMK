import GridMotion from "@/components/gridmotion";
import AboutUs from "@/components/aboutUS";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
import BookingAssistant from "@/components/bookingassistent";
import { customItems } from "@/data";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main className="">
      <GridMotion items={customItems} gradientColor="#dc2626" />
      <AboutUs />
      <Services />
      <Testimonials />
      <Footer />
      <BookingAssistant />
    </main>
  );
}