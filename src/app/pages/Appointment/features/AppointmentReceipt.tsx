import { useState } from "react";
import { APP_CONSTANTS, WEBAPP } from "../../../config/config";
import Modal from "../../../components/others/Modal";
import { FcDocument } from "react-icons/fc";
import Button from "../../../components/buttons/Button";

const AppointmentReceipt = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <div className="w-full mx-auto space-y-10">
        <div className="p-5">
          <section></section>
          <section className="w-full md:w-1/2 mx-auto">
            <div className="bg-primary flex items-center gap-3 p-3 rounded-t-xl">
              <img src={WEBAPP.LOGO} alt={WEBAPP.NAME} className="size-14" />
              <h1 className="text-white text-2xl">{WEBAPP.NAME}</h1>
            </div>
            <div className="StyledReceipt">Details</div>
          </section>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          className="w-1/3 bg-secondary"
        >
          <div className="flex flex-col items-center justify-center gap-5">
            <FcDocument className="text-6xl" />
            <div className="text-center">
              <h1 className="text-lg text-primary font-bold">
                {APP_CONSTANTS.TITLES.APPOINTMENT_BOOKED_SUCCESSFULLY}
              </h1>
              <p className="text-black">
                {APP_CONSTANTS.DESCRIPTIONS.BOOKING_INFO_IN_YOUR_EMAIL}
              </p>
            </div>
            <div className="self-end" onClick={toggleModal}>
              <Button
                className="bg-primary text-white py-1.5 px-5"
                ariaLabel={APP_CONSTANTS.BUTTONS.CLOSE}
              >
                {APP_CONSTANTS.BUTTONS.CLOSE}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AppointmentReceipt;
