import { useEffect, useState } from "react";
import { useToast } from "../contexts/ToastProvider";
import { ProjectModel } from "../models/ProjectModel";
import { getLatestImageUrl } from "../utils/common";
import { useFileUpload } from "./useFileUpload";
import useModal from "./useModal";
import { useProject } from "./useProject";

const useHeroSection = () => {
  const { currentProject, updateProject, loading } = useProject();
  const { showToast } = useToast();
  const { uploadFile } = useFileUpload();
  const { isOpen, openModal, closeModal } = useModal();
  const [projectData, setProjectData] = useState<Partial<ProjectModel>>({
    name: "",
    description: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [hasBackgroundImage, setHasBackgroundImage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isOpen && currentProject) {
      setProjectData({
        name: currentProject.name,
        description: currentProject.description,
      });
      const latestImageUrl = getLatestImageUrl(
        currentProject.attachments || []
      );
      setHasBackgroundImage(latestImageUrl);
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
  };

  const handleUpdateProject = async () => {
    if (!projectData.name) {
      showToast("Name is required.", "error", "top-20 right-10");
      return;
    }

    try {
      const updatedData: Partial<ProjectModel> = {
        name: projectData.name,
        description: projectData.description,
      };

      if (uploadedFile) {
        const result = await uploadFile(
          uploadedFile,
          `project/${currentProject?._id}/images`
        );
        updatedData.attachments = [
          ...(currentProject?.attachments || []),
          result.secure_url,
        ];
        setHasBackgroundImage(result.secure_url);
      }

      await updateProject(updatedData);
      closeModal();
    } catch (error) {
      console.error("Update failed:", error);
      showToast("Failed to update project.", "error", "top-20 right-10");
    }
  };

  const handleFileUpload = (files: File | File[]) => {
    if (Array.isArray(files)) {
      if (files.length > 0) {
        handleSingleFileUpload(files[0]);
      }
    } else {
      handleSingleFileUpload(files);
    }
  };

  const handleSingleFileUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setHasBackgroundImage(imageUrl);
    setUploadedFile(file);
  };

  const clearBackgroundImage = () => {
    setHasBackgroundImage(null);
    setUploadedFile(null);
  };

  const backgroundImageUrl = getLatestImageUrl(
    currentProject?.attachments || []
  );

  return {
    currentProject,
    updateProject,
    handleInputChange,
    handleUpdateProject,
    handleFileUpload,
    clearBackgroundImage,
    hasBackgroundImage,
    isOpen,
    openModal,
    closeModal,
    setHasBackgroundImage,
    projectData,
    uploadedFile,
    backgroundImageUrl,
    loading,
  };
};

export default useHeroSection;
