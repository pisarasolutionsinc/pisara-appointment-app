import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { APP_CONSTANTS, WEBAPP } from "../../../config/config";
import { MdEmail } from "react-icons/md";

const GetInTouchSection = () => {
  return (
    <>
      <div className="relative w-full bg-accent overflow-hidden p-10 space-y-5 border-b-8 border-b-primary">
        <div className="container mx-auto space-y-5">
          <h1 className="text-5xl font-bold text-primary">
            {APP_CONSTANTS.TITLES.GET_IN_TOUCH}
          </h1>
          <hr className="border-primary" />
          <section className="space-y-5 text-xl">
            <div className="flex items-center gap-5">
              <FaLocationDot className="text-primary" />
              <p>{WEBAPP.ADDRESS}</p>
            </div>
            <div className="flex items-center gap-5">
              <FaPhone className="text-primary" />
              <p>{WEBAPP.CONTACT_NUMBER}</p>
            </div>
            <div className="flex items-center gap-5">
              <MdEmail className="text-primary" />
              <p>{WEBAPP.EMAIL}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default GetInTouchSection;
