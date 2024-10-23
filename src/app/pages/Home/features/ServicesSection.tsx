import { IoIosAdd, IoIosClose } from "react-icons/io";
import Button from "../../../components/buttons/Button";
import { APP_CONSTANTS } from "../../../config/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useModal from "../../../hooks/useModal";
import Modal from "../../../components/others/Modal";
import InputForm from "../../../components/forms/InputForm";
import TextAreaForm from "../../../components/forms/TextAreaForm";
import FileImport from "../../../components/forms/FileImport";
import { FaImage } from "react-icons/fa";
import { Card } from "../../../components/cards/Card";
import Tooltip from "../../../components/others/Tooltip";
import Loading from "../../../components/others/Loading";
import useHeroSection from "../../../hooks/useHeroSection";
import { ProjectModel } from "../../../models/ProjectModel";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { useProject } from "../../../hooks/useProject";
import useItems from "../../../hooks/useItems";
import { ItemService } from "../../../services/ItemService";
import { getFieldValue } from "../../../utils/getFieldValue";
import { safeMapFields } from "../../../utils/safeMapFields";

interface FormData {
  fields: {
    common: any[];
    custom: any[];
  };
}

const ServicesSection = () => {
  const itemService = new ItemService();
  const { isOpen, openModal, closeModal } = useModal();
  const { currentProject, getCurrentProjectCommonFields } = useProject();
  const { createItem, updateItem } = useItems();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const { uploadFile } = useFileUpload();
  const {
    hasBackgroundImage,
    setHasBackgroundImage,
    uploadedFile,
    clearBackgroundImage,
    handleFileUpload,
  } = useHeroSection();

  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const commonFields =
    getCurrentProjectCommonFields(currentProject, { exclusions: [] }) || [];

  const [services, setServices] = useState<any[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [itemFormData, setItemFormData] = useState<FormData>({
    fields: {
      common: [],
      custom: [],
    },
  });

  useEffect(() => {
    const searchServices = async () => {
      if (!currentProject) return;

      setLoading(true);
      try {
        const searchService = await itemService.searchItem({
          query: {
            projectId: currentProject._id,
            $and: [
              { "fields.common.value": "Services" },
              { "fields.common.value": "Active" },
            ],
          },
          select: "_id projectId coverPhoto fields",
          populateArray: [
            "_id",
            "fields.common.fieldId",
            {
              path: "fields",
              select: "_id projectId fields",
              populate: ["fields.common.fieldId", "fields.custom.fieldId"],
            },
            "fields.custom",
            "attachments",
          ],
        });

        const processedServices = searchService.map((service) => {
          const titleField = service.fields?.common
            ? getFieldValue(service.fields.common, APP_CONSTANTS.LABELS.TITLE)
            : "";
          const descriptionField = service.fields?.common
            ? getFieldValue(
                service.fields.common,
                APP_CONSTANTS.LABELS.DESCRIPTION
              )
            : "";

          return {
            ...service,
            title: titleField,
            content: descriptionField,
          };
        });

        setServices(processedServices || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    searchServices();
  }, [currentProject]);

  useEffect(() => {
    if (commonFields.length > 0) {
      handleDefault();
    }
  }, [commonFields]);

  const handleDefault = () => {
    if (!itemFormData.fields.common.length) {
      setItemFormData((prev) => ({
        ...prev,
        projectId: currentProject?._id ? currentProject._id : "",
        fields: {
          ...prev.fields,
          common: commonFields
            .filter((field) =>
              ["Title", "Description", "Status", "Type"].includes(field.name!)
            )
            .map((field) => {
              if (field.name === "Type") {
                return { fieldId: field._id, value: "Services" };
              } else if (field.name === "Status") {
                return { fieldId: field._id, value: "Active" };
              } else {
                return { fieldId: field._id, value: "" };
              }
            }),
        },
      }));
    }
  };

  const handleInputChange = (
    fieldId: string,
    value: string,
    type: "common" | "custom"
  ) => {
    setItemFormData((prev) => {
      const updatedFields = prev.fields[type].map((field) =>
        field.fieldId === fieldId ? { ...field, value } : field
      );
      return {
        ...prev,
        fields: {
          ...prev.fields,
          [type]: updatedFields,
        },
      };
    });
  };

  const handleAddService = async () => {
    console.log("Final Form Data:", itemFormData);

    if (!currentProject?._id) return;

    setLoading(true);
    try {
      const ForData = {
        projectId: currentProject._id as unknown as ProjectModel,
        fields: {
          common: [...itemFormData.fields.common],
          custom: [...itemFormData.fields.custom],
        },
      };

      const createdItem = await createItem(ForData);

      if (uploadedFile) {
        const result = await uploadFile(
          uploadedFile,
          `project/${currentProject?._id}/items/${createdItem._id}/attachments/`
        );
        await updateItem({
          ...createdItem,
          coverPhoto: result.secure_url,
        });
        setHasBackgroundImage(result.secure_url);
      }

      setServices((prevServices) => [
        {
          ...createdItem,
          title: ForData.fields?.common![0].value,
          content: ForData.fields?.common![1].value,
        },
        ...prevServices,
      ]);
      closeModal();
    } catch (error) {
      console.error("Error adding service", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async () => {
    if (!selectedServiceId) return;
    setLoading(true);
    try {
      await itemService.deleteItem(selectedServiceId);
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== selectedServiceId)
      );
      closeDeleteModal();
      setSelectedServiceId(null);
    } catch (error) {
      console.error("Failed to delete service", error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirmation = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    openDeleteModal();
  };

  const canAddMoreServices = services.length < 9;

  if (!services.length && user?.type !== "admin") return null;

  return (
    <>
      <div className="relative w-full overflow-hidden space-y-5">
        <h1 className="text-5xl font-bold text-black/80 text-center mt-20">
          {APP_CONSTANTS.TITLES.SERVICE_SECTION}
        </h1>

        <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 p-5">
          {loading ? (
            <div className="flex justify-center">
              <Loading text={APP_CONSTANTS.PLACEHOLDERS.LOADING} />
            </div>
          ) : (
            services.map((service, index) => (
              <Card
                card={{
                  title: service.title,
                  image: service.coverPhoto,
                  content: service.content,
                }}
                key={index}
                className="relative w-full h-[40vh] p-0 border border-gray-300 rounded-lg shadow-md flex flex-col overflow-hidden"
              >
                <Card.Image className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-60" />
                <div className="relative z-10 flex flex-col justify-end gap-5 p-5 h-full">
                  {user?.type === "admin" && (
                    <Button
                      className="absolute z-50 p-0 bg-white top-2 right-2 text-3xl rounded-full"
                      onClick={() => openDeleteConfirmation(service._id)}
                    >
                      <IoIosClose />
                    </Button>
                  )}

                  <div className="space-y-3">
                    <Card.Title
                      className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-transparent to-transparent"
                      style={{ WebkitTextStroke: "1px white" }}
                    />
                    <hr />
                    <Tooltip
                      className="z-50 w-2/3 text-md -top-3/4 text-wrap"
                      direction="bottom"
                      text={service.content}
                    >
                      <Card.Content className="text-xl text-white/90 line-clamp-5" />
                    </Tooltip>
                  </div>
                  <Button
                    className="w-fit bg-primary text-white rounded-full uppercase shadow-md"
                    ariaLabel={APP_CONSTANTS.BUTTONS.START_BOOKING}
                  >
                    {APP_CONSTANTS.BUTTONS.START_BOOKING}
                  </Button>
                </div>
              </Card>
            ))
          )}

          {canAddMoreServices && user?.type === "admin" && (
            <Button
              className="w-full h-[40vh] border border-dashed border-black bg-white rounded-lg flex justify-center items-center"
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
          className="md:w-1/2"
          isOpen={isOpen}
          onClose={closeModal}
          title={APP_CONSTANTS.TITLES.ADD_SERVICE}
        >
          <section className="space-y-5">
            <div className="space-y-2">
              <p className="text-black">
                {APP_CONSTANTS.LABELS.BACKGROUND_IMAGE}
              </p>
              {hasBackgroundImage ? (
                <div className="relative">
                  <Button
                    className="absolute top-4 right-4 p-0 rounded-full text-white bg-neutral"
                    onClick={clearBackgroundImage}
                    ariaLabel={APP_CONSTANTS.BUTTONS.CANCEL}
                  >
                    <IoIosClose className="text-5xl" />
                  </Button>
                  <img
                    src={hasBackgroundImage}
                    alt="Background preview"
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <FileImport
                  className="bg-white"
                  icon={<FaImage />}
                  onFileUpload={handleFileUpload}
                  accept="image/*"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="text-black">
                {APP_CONSTANTS.LABELS.SERVICE}
              </label>
              {safeMapFields(commonFields, (field, index) => (
                <div key={`${field._id}-${index}`}>
                  {field.name === "Title" && (
                    <InputForm
                      name="Title"
                      onChange={(e) =>
                        handleInputChange(field._id, e.target.value, "common")
                      }
                      placeholder="Add service title"
                    />
                  )}
                </div>
              ))}

              {safeMapFields(commonFields, (field, index) => (
                <div key={`${field._id}-${index}`}>
                  {field.name === "Type" && (
                    <InputForm
                      name="Type"
                      onChange={(e) =>
                        handleInputChange(field._id, e.target.value, "common")
                      }
                      className="hidden"
                      placeholder="Add Type"
                    />
                  )}
                </div>
              ))}
              {safeMapFields(commonFields, (field, index) => (
                <div key={`${field._id}-${index}`}>
                  {field.name === "Status" && (
                    <InputForm
                      name="Status"
                      onChange={(e) =>
                        handleInputChange(field._id, e.target.value, "common")
                      }
                      className="hidden"
                      placeholder="Add Status"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-black">
                {APP_CONSTANTS.LABELS.DESCRIPTION}
              </label>
              {safeMapFields(commonFields, (field, index) => (
                <div key={`${field._id}-${index}`}>
                  {field.name === "Description" && (
                    <TextAreaForm
                      name="Description"
                      onChange={(e) =>
                        handleInputChange(field._id, e.target.value, "common")
                      }
                      placeholder="Add service description"
                    />
                  )}
                </div>
              ))}
            </div>
            <hr />
            <section className="flex items-center justify-end gap-3">
              <Button
                onClick={closeModal}
                ariaLabel={APP_CONSTANTS.BUTTONS.CANCEL}
              >
                {APP_CONSTANTS.BUTTONS.CANCEL}
              </Button>
              <Button
                className="bg-primary text-white"
                onClick={handleAddService}
                ariaLabel={APP_CONSTANTS.BUTTONS.ADD}
              >
                {APP_CONSTANTS.BUTTONS.ADD}
              </Button>
            </section>
          </section>
        </Modal>
      )}

      {isDeleteModalOpen && user?.type === "admin" && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          className="w-fit"
          title="Delete Service"
        >
          <section>
            <h1>Are You sure you want to delete this Service?</h1>
          </section>
          <hr />
          <section className="flex items-center justify-end gap-3">
            <Button
              onClick={closeDeleteModal}
              ariaLabel={APP_CONSTANTS.BUTTONS.CANCEL}
            >
              {APP_CONSTANTS.BUTTONS.CANCEL}
            </Button>
            <Button
              className="bg-danger text-white"
              onClick={handleDeleteService}
              ariaLabel={APP_CONSTANTS.BUTTONS.REMOVE}
            >
              {APP_CONSTANTS.BUTTONS.REMOVE}
            </Button>
          </section>
        </Modal>
      )}
    </>
  );
};

export default ServicesSection;
