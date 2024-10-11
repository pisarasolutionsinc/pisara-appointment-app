import { IoIosAdd } from "react-icons/io";
import Button from "../../../components/buttons/Button";
import { APP_CONSTANTS } from "../../../config/config";
import { PLACEHOLDERS } from "../../../config/placeholderImg";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useModal from "../../../hooks/useModal";
import Modal from "../../../components/others/Modal";
import InputForm from "../../../components/forms/InputForm";
import TextAreaForm from "../../../components/forms/TextAreaForm";
import FileImport from "../../../components/forms/FileImport";
import { FaImage } from "react-icons/fa";
import { Card } from "../../../components/cards/Card";

const ServicesSection = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const { isOpen, openModal, closeModal } = useModal();

  const services = Array(8).fill({
    title: "Service",
    description:
      "Brief description of the service.Brief description of the service.Brief description of the service.Brief description of the service.Brief description of the service.",
    img: PLACEHOLDERS.GYM,
  });

  // Check if services are less than 9
  const canAddMoreServices = services.length < 9;

  return (
    <>
      <div className="relative w-full overflow-hidden space-y-5">
        <h1 className="text-5xl font-bold text-black/80 text-center mt-20">
          {APP_CONSTANTS.TITLES.SERVICE_SECTION}
        </h1>

        <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 p-5">
          {services.map((service, index) => (
            <Card
              card={{
                title: service.title,
                image: service.img,
                content: service.description,
              }}
              key={index}
              className="relative w-full p-0 border border-gray-300 rounded-lg shadow-md flex flex-col overflow-hidden"
            >
              <Card.Image className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-60" />
              <div className="relative z-10 p-5 space-y-5">
                <Card.Title
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-transparent to-transparent"
                  style={{ WebkitTextStroke: "1px white" }}
                />
                <hr />
                <Card.Content className="text-gray-200" />
                <Button
                  className="w-fit bg-primary text-white rounded-full uppercase shadow-md"
                  ariaLabel={APP_CONSTANTS.BUTTONS.START_BOOKING}
                >
                  {APP_CONSTANTS.BUTTONS.START_BOOKING}
                </Button>
              </div>
            </Card>
          ))}

          {canAddMoreServices && user?.type === "admin" && (
            <Button
              className="w-full h-full border border-dashed border-black bg-white rounded-lg flex justify-center items-center"
              onClick={openModal}
              ariaLabel="Add more services"
            >
              <IoIosAdd className="text-8xl text-white border rounded-full p-1 bg-primary " />
            </Button>
          )}
        </section>
      </div>

      {isOpen && user?.type === "admin" && (
        <Modal
          className="w-1/2"
          isOpen={isOpen}
          onClose={closeModal}
          title={APP_CONSTANTS.TITLES.ADD_SERVICE}
        >
          <section className="space-y-5">
            <div className="space-y-2">
              <p className="text-black">
                {APP_CONSTANTS.LABELS.BACKGROUND_IMAGE}
              </p>
              <FileImport className="bg-white" icon={<FaImage />} />
            </div>
            <div className="space-y-2">
              <label className="text-black">
                {APP_CONSTANTS.LABELS.SERVICE}
              </label>
              <InputForm
                name="service"
                // value={projectData.name}
                // onChange={handleInputChange}
                placeholder={APP_CONSTANTS.PLACEHOLDERS.ADD_SERVICE}
              />
            </div>
            <div className="space-y-2">
              <label className="text-black">
                {APP_CONSTANTS.LABELS.DESCRIPTION}
              </label>
              <TextAreaForm
                name="description"
                // value={projectData.description}
                // onChange={handleInputChange}
                placeholder={APP_CONSTANTS.PLACEHOLDERS.ENTER_DESCRIPTION}
                maxLength={250}
              />
            </div>
          </section>
          <hr />
          <section className="flex justify-end gap-5">
            <Button
              className="text-black"
              onClick={closeModal}
              ariaLabel={APP_CONSTANTS.BUTTONS.CANCEL}
            >
              {APP_CONSTANTS.BUTTONS.CANCEL}
            </Button>
            <Button
              className="text-white bg-primary"
              // onClick={handleUpdateProject}
              ariaLabel={APP_CONSTANTS.BUTTONS.ADD}
            >
              {APP_CONSTANTS.BUTTONS.ADD}
            </Button>
          </section>
        </Modal>
      )}
    </>
  );
};

export default ServicesSection;
