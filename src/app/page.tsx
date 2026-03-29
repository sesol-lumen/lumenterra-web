import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CompanySection from "@/components/CompanySection";
import PlatpharmSection from "@/components/PlatpharmSection";
import YakkokSection from "@/components/YakkokSection";
import PressSection from "@/components/PressSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CompanySection />
        <PlatpharmSection />
        <YakkokSection />
        <PressSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
