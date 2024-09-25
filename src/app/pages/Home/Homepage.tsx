import AboutUsSection from "./features/AboutUsSection";
import GallerySection from "./features/GallerySection";
import GetInTouchSection from "./features/GetInTouchSection";
import HeroSection from "./features/HeroSection";
import ScheduleSection from "./features/ScheduleSection";
import ServicesSection from "./features/ServicesSection";

const Homepage = () => {
  return (
    <>
      <div className="bg-secondary">
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <ScheduleSection />
        <AboutUsSection />
        <GetInTouchSection />
      </div>
    </>
  );
};

export default Homepage;
