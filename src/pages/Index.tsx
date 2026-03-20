import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <FeaturedProperties />
    <FeaturedVehicles />
    <ServicesSection />
    <StatsSection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
