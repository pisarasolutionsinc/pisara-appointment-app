import Button from "../../../components/buttons/Button";
import { APP_CONSTANTS } from "../../../config/config";

const AppointmentConfirmation = () => {
  return (
    <>
      <div className="w-full md:w-2/3 mx-auto space-y-10">
        <h1 className="text-primary text-4xl font-bold text-center">
          {APP_CONSTANTS.TITLES.APPOINTMENT_CONFIRMATION}
        </h1>
        <div className="md:max-h-[70vh] bg-secondary p-5 space-y-5 rounded-lg shadow-md">
          <section className="space-y-5">
            <h1 className="text-primary text-2xl font-bold text-center">
              {APP_CONSTANTS.TITLES.YOUR_INFORMATION}
            </h1>
          </section>
          <hr className="border border-neutral" />
          <section className="space-y-5">
            <h1 className="text-primary text-2xl font-bold text-center">
              {APP_CONSTANTS.TITLES.IN_CASE_OF_EMERGENCY}
            </h1>
          </section>
          <div className="flex items-center justify-center">
            <Button className="w-1/3 bg-primary text-white text-xl rounded-full uppercase">
              {APP_CONSTANTS.BUTTONS.BOOK}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentConfirmation;
