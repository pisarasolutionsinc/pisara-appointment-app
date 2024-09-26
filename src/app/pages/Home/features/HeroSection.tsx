import Button from "../../../components/buttons/Button";
import { APP_CONSTANTS, WEBAPP } from "../../../config/config";
import { PLACEHOLDERS } from "../../../config/placeholderImg";

interface HeroSectionProps {
  scrollToSchedule: () => void;
}

const HeroSection = ({ scrollToSchedule }: HeroSectionProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <img
        src={PLACEHOLDERS.GYM}
        alt={APP_CONSTANTS.PLACEHOLDERS.GYM}
        className="w-full h-full md:object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-20" />
      <section className="absolute inset-0 top-1/2 md:top-2/3 md:left-14 z-10 m-5 md:m-0 flex items-center justify-center  text-white h-fit w-fit">
        <div className="p-5 rounded-lg bg-black/55 space-y-5">
          <h1 className="text-4xl font-semibold">{WEBAPP.NAME}</h1>
          <p className="text-lg whitespace-pre-wrap break-words max-w-lg">
            {WEBAPP.DESCRIPTION}
          </p>
          <Button
            className="bg-primary text-white rounded-full text-lg uppercase shadow-md"
            onClick={scrollToSchedule}
            ariaLabel={APP_CONSTANTS.BUTTONS.BOOK_NOW}
          >
            {APP_CONSTANTS.BUTTONS.BOOK_NOW}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
