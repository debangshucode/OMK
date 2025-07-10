"use client";
import GridMotion from "@/components/gridmotion";
import AboutUs from "@/components/aboutUS";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
import BookingAssistant from "@/components/bookingassistent";
import { customItems } from "@/data";
import Footer from "@/components/footer";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import RecentWorks from "@/components/RecentWorks";
import BlogHome from "@/components/blogHome";

export default function HomePage() {
    const {  setUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get("http://localhost:4000/api/auth/getuser", { withCredentials: true })
        .then((res) => {
          setUser(res.data.user);
          // setIsAuthenticated(true);
        })
        .catch((err) => {
          setUser(null);
          // setIsAuthenticated(false);
        });
    };
    getUser();
  }, []);
  return (
    
    <main className="">
      <GridMotion items={customItems} gradientColor="#dc2626" />
      <RecentWorks />
      <AboutUs />
      <Services />
      <BlogHome />
      <Testimonials />
      <Footer />
      <BookingAssistant />
    </main>
  );
}