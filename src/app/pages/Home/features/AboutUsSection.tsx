import Button from "../../../components/buttons/Button";
import { APP_CONSTANTS, WEBAPP } from "../../../config/config";

const AboutUsSection = () => {
  return (
    <>
      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden p-10 space-y-5">
        <div className="container mx-auto flex flex-col md:flex-row  gap-10">
          <img src={WEBAPP.LOGO} alt={WEBAPP.NAME} width={250} />
          <section className="space-y-5">
            <h1 className="text-5xl font-bold text-primary">
              {APP_CONSTANTS.TITLES.ABOUT_US_SECTION}
            </h1>
            <p className="text-black text-lg whitespace-pre-wrap break-words max-w-3xl">
              {WEBAPP.ABOUT}
            </p>
            <Button
              className="bg-primary text-white"
              ariaLabel={APP_CONSTANTS.BUTTONS.LEARN_MORE}
            >
              {APP_CONSTANTS.BUTTONS.LEARN_MORE}
            </Button>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUsSection;
