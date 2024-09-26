import { useRef } from "react";
import AboutUsSection from "./features/AboutUsSection";
import GallerySection from "./features/GallerySection";
import GetInTouchSection from "./features/GetInTouchSection";
import HeroSection from "./features/HeroSection";
import ScheduleSection from "./features/ScheduleSection";
import ServicesSection from "./features/ServicesSection";
import ScrollToTopButton from "../../components/buttons/ScrollToTopButton";
import { IoIosArrowUp } from "react-icons/io";

const Homepage = () => {
  const scheduleRef = useRef<HTMLDivElement>(null);

  const scrollToSchedule = () => {
    if (scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-secondary relative">
        <HeroSection scrollToSchedule={scrollToSchedule} />
        <ServicesSection />
        <GallerySection />
        <div ref={scheduleRef}>
          <ScheduleSection />
        </div>
        <AboutUsSection />
        <GetInTouchSection />
        <ScrollToTopButton
          onClick={scrollToTop}
          position="bottom-5 right-5"
          className="bg-neutral text-black"
        >
          <IoIosArrowUp />
        </ScrollToTopButton>
      </div>
    </>
  );
};

export default Homepage;
