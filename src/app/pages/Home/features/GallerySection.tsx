import { APP_CONSTANTS } from "../../../config/config";
import Gallery from "./Gallery";
import useProject from "../../../hooks/useProject";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Button from "../../../components/buttons/Button";
import useModal from "../../../hooks/useModal";
import Modal from "../../../components/others/Modal";
import FileImport from "../../../components/forms/FileImport";
import { FaImage } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import Loading from "../../../components/others/Loading";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { ProjectModel } from "../../../models/ProjectModel";
import { useToast } from "../../../contexts/ToastProvider";
import { extractPublicId } from "../../../utils/common";

const GallerySection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedImageForDeletion, setSelectedImageForDeletion] = useState<{
    imageUrl: string;
    publicId: string | null;
  } | null>(null);

  const { currentProject, updateProject, loading } = useProject();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const { showToast } = useToast();
  const { uploadFile, removeFile } = useFileUpload();

  const handleFileUpload = (files: File | File[]) => {
    if (Array.isArray(files)) {
      const totalImages =
        galleryImages.length + uploadedFiles.length + files.length;

      if (totalImages > 9) {
        showToast(
          "You can only upload up to 9 images in total.",
          "error",
          "top-20 right-10"
        );
        return;
      }
      setUploadedFiles((prev) => [...prev, ...files]);
    } else {
      const totalImages = galleryImages.length + uploadedFiles.length + 1;

      if (totalImages > 9) {
        showToast(
          "You can only upload up to 9 images in total.",
          "error",
          "top-20 right-10"
        );
        return;
      }
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

    console.log(publicId);
    setSelectedImageForDeletion({ imageUrl, publicId });
    openDeleteModal();
  };

  const handleUpdateGallery = async () => {
    const updatedProject: ProjectModel = {
      _id: currentProject!._id,
      owner: currentProject!.owner,
      name: currentProject!.name,
      description: currentProject?.description || "",
      attachments: currentProject?.attachments || [],
      key: currentProject!.key,
    };

    try {
      for (const file of uploadedFiles) {
        const result = await uploadFile(
          file,
          `project/${currentProject?._id}/images`
        );
        updatedProject.attachments?.push(result.secure_url);
      }
      await updateProject(updatedProject);
    } catch (error) {
      console.error("Update failed:", error);
      showToast("Failed to update project.", "error", "top-20 right-10");
    }
  };

  const handleRemoveImage = async () => {
    if (selectedImageForDeletion && selectedImageForDeletion.publicId) {
      console.log("Deleting publicId:", selectedImageForDeletion.publicId);

      try {
        const removalResult = await removeFile(
          selectedImageForDeletion.publicId
        );
        console.log("Cloudinary removal result:", removalResult);

        if (!currentProject?._id) {
          throw new Error("Project ID is required to update the project.");
        }

        const updatedProject: ProjectModel = {
          _id: currentProject._id,
          owner: currentProject.owner,
          name: currentProject.name,
          description: currentProject.description || "",
          attachments:
            currentProject.attachments?.filter(
              (attachment) => attachment !== selectedImageForDeletion.imageUrl
            ) || [],
          key: currentProject.key,
          metadata: currentProject.metadata,
        };

        await updateProject(updatedProject);
        showToast("Image removed successfully", "success", "top-20 right-10");
      } catch (error) {
        console.error("Remove failed:", error);
        showToast("Failed to remove image", "error", "top-20 right-10");
      } finally {
        closeDeleteModal();
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

  const totalImages = galleryImages.length + uploadedFiles.length;
  const imageUrls = galleryImages.map((image) => image.url);

  const canAddMoreImages = totalImages < 9;

  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden space-y-5">
        <section
          className={`container p-2 flex items-center ${
            user?.type === "admin" ? "justify-between" : "justify-center"
          }`}
        >
          <h1 className="text-5xl font-bold text-black/80 mt-20">
            {APP_CONSTANTS.TITLES.GALLERY_SECTION}
          </h1>
          {user?.type === "admin" && (
            <Button
              className="mt-20 bg-primary text-white"
              onClick={openModal}
              ariaLabel={APP_CONSTANTS.BUTTONS.MANAGE}
            >
              {APP_CONSTANTS.BUTTONS.MANAGE}
            </Button>
          )}
        </section>
        <section className="w-full h-full flex flex-col md:flex-col items-center justify-center gap-5 p-5">
          <Gallery images={imageUrls} />
        </section>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="md:w-3/4"
          title={APP_CONSTANTS.TITLES.EDIT_GALLERY_SECTION}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative">
                <Button
                  className="absolute top-1 right-1 p-0 rounded-full text-white bg-neutral"
                  ariaLabel={APP_CONSTANTS.BUTTONS.CANCEL}
                  onClick={() => handleDeleteImage(image.url, image.publicId)}
                >
                  <IoIosClose className="text-2xl" />
                </Button>
                <img
                  src={image.url}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}

            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative">
                <Button
                  className="absolute top-1 right-1 p-0 rounded-full text-white bg-neutral"
                  onClick={() => clearImage(index, true)}
                  ariaLabel={APP_CONSTANTS.BUTTONS.CANCEL}
                >
                  <IoIosClose className="text-2xl" />
                </Button>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
            {canAddMoreImages && user?.type === "admin" && (
              <FileImport
                className="bg-white"
                icon={<FaImage />}
                onFileUpload={handleFileUpload}
                accept="image/*"
                multiple={true}
              />
            )}
          </div>

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
              className={`text-white ${loading ? "bg-neutral" : "bg-primary"}`}
              ariaLabel={APP_CONSTANTS.BUTTONS.UPDATE}
              onClick={handleUpdateGallery}
              disable={loading}
            >
              {loading ? (
                <Loading text={APP_CONSTANTS.PLACEHOLDERS.LOADING} />
              ) : (
                APP_CONSTANTS.BUTTONS.UPDATE
              )}
            </Button>
          </section>
        </Modal>
      )}

      {isDeleteModalOpen && selectedImageForDeletion && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          className="w-1/2"
          title={APP_CONSTANTS.TITLES.DELETE_IMAGE}
        >
          <img
            src={selectedImageForDeletion.imageUrl}
            alt="Selected image for deletion"
            className="w-full object-cover rounded-md"
          />

          <hr />
          <section className="flex justify-end gap-5">
            <Button
              className="text-black"
              onClick={closeDeleteModal}
              ariaLabel={APP_CONSTANTS.BUTTONS.CANCEL}
            >
              {APP_CONSTANTS.BUTTONS.CANCEL}
            </Button>
            <Button
              className={`text-white ${loading ? "bg-neutral" : "bg-danger"}`}
              ariaLabel={APP_CONSTANTS.BUTTONS.REMOVE}
              onClick={handleRemoveImage}
              disable={loading}
            >
              {loading ? (
                <Loading text={APP_CONSTANTS.PLACEHOLDERS.LOADING} />
              ) : (
                APP_CONSTANTS.BUTTONS.REMOVE
              )}
            </Button>
          </section>
        </Modal>
      )}
    </>
  );
};

export default GallerySection;
