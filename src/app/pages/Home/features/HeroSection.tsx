import { useContext, useState, useEffect } from "react";
import Button from "../../../components/buttons/Button";
import { APP_CONSTANTS, WEBAPP } from "../../../config/config";
import { PLACEHOLDERS } from "../../../config/placeholderImg";
import useProject from "../../../hooks/useProject";
import { AuthContext } from "../../../contexts/AuthContext";
import { MdModeEdit } from "react-icons/md";
import useModal from "../../../hooks/useModal";
import Modal from "../../../components/others/Modal";
import InputForm from "../../../components/forms/InputForm";
import TextAreaForm from "../../../components/forms/TextAreaForm";
import { ProjectModel } from "../../../models/ProjectModel";
import FileImport from "../../../components/forms/FileImport";
import { FaImage } from "react-icons/fa6";

interface HeroSectionProps {
  scrollToSchedule: () => void;
}

const HeroSection = ({ scrollToSchedule }: HeroSectionProps) => {
  const { currentProject, updateProject } = useProject();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const { isOpen, openModal, closeModal } = useModal();
  const [projectData, setProjectData] = useState<Partial<ProjectModel>>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen && currentProject) {
      setProjectData({
        name: currentProject.name,
        description: currentProject.description,
      });
      console.log("Modal opened with project data:", projectData);
    }
  }, [isOpen, currentProject]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Updated projectData:", { ...projectData, [name]: value });
  };

  const handleUpdateProject = async () => {
    const newErrors = {} as { name?: string; description?: string };

    console.log("Project Data before update:", projectData);

    if (!projectData.name) {
      console.error("Name is required");
      return;
    }
    if (!projectData.description) {
      newErrors.description = "Fill all required fields";
    }

    if (Object.keys(newErrors).length > 0) {
      console.error("Validation Errors:", newErrors);
      return;
    }
    if (!currentProject?._id) {
      console.error("Project ID is required for update.");
      return;
    }

    try {
      const updatedProject: ProjectModel = {
        _id: projectData._id!,
        owner: projectData.owner,
        name: projectData.name || currentProject.name,
        description: projectData.description || currentProject.description,
        // attachments: currentProject.attachments,
        // metadata: currentProject.metadata,
      };
      await updateProject(updatedProject);
      closeModal();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  console.log("Payload for API:", {
    _id: currentProject?._id,
    name: projectData.name,
    description: projectData.description,
  });

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src={PLACEHOLDERS.GYM}
          alt={APP_CONSTANTS.PLACEHOLDERS.GYM}
          className="w-full h-full md:object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="absolute top-20 right-10">
          {user?.type === "admin" && (
            <Button
              className="bg-primary text-white flex items-center gap-3"
              onClick={openModal}
              ariaLabel={APP_CONSTANTS.BUTTONS.EDIT}
            >
              {APP_CONSTANTS.BUTTONS.EDIT} <MdModeEdit />
            </Button>
          )}
        </div>
        <section className="absolute inset-0 top-1/2 md:top-2/3 md:left-14 z-10 m-5 md:m-0 flex items-center justify-center text-white h-fit w-fit">
          <div className="p-5 rounded-lg bg-black/55 space-y-5">
            <h1 className="text-4xl font-semibold">
              {currentProject?.name || WEBAPP.NAME}
            </h1>
            <p className="text-lg whitespace-pre-wrap break-words max-w-lg">
              {currentProject?.description || WEBAPP.DESCRIPTION}
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
      {isOpen && (
        <Modal
          className="w-1/2"
          isOpen={isOpen}
          onClose={closeModal}
          title="Edit Hero Section"
        >
          <section className="space-y-5">
            <div className="space-y-2">
              <label>{APP_CONSTANTS.LABELS.TITLE}</label>
              <InputForm
                name="name"
                value={projectData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label>{APP_CONSTANTS.LABELS.DESCRIPTION}</label>
              <TextAreaForm
                name="description"
                value={projectData.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <FileImport className="bg-white" icon={<FaImage />} />
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
              onClick={handleUpdateProject}
              ariaLabel={APP_CONSTANTS.BUTTONS.UPDATE}
            >
              {APP_CONSTANTS.BUTTONS.UPDATE}
            </Button>
          </section>
        </Modal>
      )}
    </>
  );
};

export default HeroSection;
