import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastProvider";
import { useFileUpload } from "./useFileUpload";
import { extractPublicId } from "../utils/common";
import { useProject } from "./useProject";

const useGallery = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedImageForDeletion, setSelectedImageForDeletion] = useState<{
    imageUrl: string;
    publicId: string | null;
  } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { currentProject, updateProject, loading } = useProject();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const { showToast } = useToast();
  const { uploadFile, removeFile } = useFileUpload();

  const handleFileUpload = (files: File | File[]) => {
    const galleryImages =
      currentProject?.attachments?.map((url) => ({
        url,
        publicId: extractPublicId(url),
      })) || [];

    const totalImages =
      galleryImages.length +
      uploadedFiles.length +
      (Array.isArray(files) ? files.length : 1);

    if (totalImages > 9) {
      showToast(
        "You can only upload up to 9 images in total.",
        "error",
        "top-20 right-10"
      );
      return;
    }

    if (Array.isArray(files)) {
      setUploadedFiles((prev) => [...prev, ...files]);
    } else {
      setUploadedFiles((prev) => [...prev, files]);
    }
  };

  const clearImage = (index: number, isUploaded: boolean) => {
    if (isUploaded) {
      setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleDeleteImage = (imageUrl: string, publicId: string | null) => {
    if (!publicId) {
      console.error("Public ID is required for deletion.");
      return;
    }

    setSelectedImageForDeletion({ imageUrl, publicId });
    setIsDeleteModalOpen(true);
  };

  const handleUpdateGallery = async () => {
    if (!currentProject) {
      console.error("Current project is not available");
      return;
    }

    try {
      const updatedAttachments = [...(currentProject.attachments || [])];

      for (const file of uploadedFiles) {
        const result = await uploadFile(
          file,
          `project/${currentProject._id}/images`
        );
        updatedAttachments.push(result.secure_url);
      }

      await updateProject({
        ...currentProject,
        attachments: updatedAttachments,
      });
      showToast("Gallery updated successfully.", "success", "top-20 right-10");
    } catch (error) {
      console.error("Update failed:", error);
      showToast("Failed to update project.", "error", "top-20 right-10");
    }
  };

  const handleRemoveImage = async () => {
    if (selectedImageForDeletion && selectedImageForDeletion.publicId) {
      try {
        await removeFile(selectedImageForDeletion.publicId);

        const updatedProject = {
          ...currentProject,
          attachments:
            currentProject?.attachments?.filter(
              (attachment) => attachment !== selectedImageForDeletion.imageUrl
            ) || [],
        };

        await updateProject(updatedProject);
        showToast("Image removed successfully", "success", "top-20 right-10");
      } catch (error) {
        console.error("Remove failed:", error);
        showToast("Failed to remove image", "error", "top-20 right-10");
      } finally {
        setIsDeleteModalOpen(false);
        setSelectedImageForDeletion(null);
      }
    } else {
      console.error("No valid image selected for deletion.");
    }
  };

  const galleryImages =
    currentProject?.attachments?.map((url) => ({
      url,
      publicId: extractPublicId(url),
    })) || [];

  return {
    uploadedFiles,
    setUploadedFiles,
    selectedImageForDeletion,
    handleFileUpload,
    clearImage,
    handleDeleteImage,
    handleUpdateGallery,
    handleRemoveImage,
    galleryImages,
    loading,
    user,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  };
};

export default useGallery;
