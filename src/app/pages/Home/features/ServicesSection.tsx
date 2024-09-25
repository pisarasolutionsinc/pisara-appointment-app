import Button from "../../../components/buttons/Button";
import { APP_CONSTANTS } from "../../../config/config";
import { PLACEHOLDERS } from "../../../config/placeholderImg";

const ServicesSection = () => {
  const services = Array(9).fill({
    title: "Service",
    description:
      "Brief description of the service.Brief description of the service.Brief description of the service.Brief description of the service.Brief description of the service.",
    img: PLACEHOLDERS.GYM,
  });

  return (
    <>
      <div
        className="relative w-full overflow-hidden space-y-5" //xl:h-screen
      >
        <h1 className="text-5xl font-bold text-black/80 text-center mt-20">
          {APP_CONSTANTS.TITLES.SERVICE_SECTION}
        </h1>
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 p-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative w-full  border border-gray-300 rounded-lg shadow-md flex flex-col overflow-hidden" //md:h-64 xl:h-60
            >
              <img
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-60" />
              <div className="relative z-10 p-5 space-y-5">
                <h1
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-transparent to-transparent"
                  style={{ WebkitTextStroke: "1px white" }}
                >{`${service.title} ${index + 1}`}</h1>
                <hr />
                <p className="text-gray-200">{service.description}</p>
                <Button
                  className="w-fit bg-primary text-white rounded-full uppercase shadow-md"
                  ariaLabel={APP_CONSTANTS.BUTTONS.START_BOOKING}
                >
                  {APP_CONSTANTS.BUTTONS.START_BOOKING}
                </Button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default ServicesSection;
