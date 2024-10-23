import { IoIosClose } from "react-icons/io";
import Button from "../../../components/buttons/Button";
import Modal from "../../../components/others/Modal";
import { APP_CONSTANTS } from "../../../config/config";
import useModal from "../../../hooks/useModal";
import Gallery from "./Gallery";
import FileImport from "../../../components/forms/FileImport";
import { FaImage } from "react-icons/fa";
import Loading from "../../../components/others/Loading";
import useGallery from "../../../hooks/useGallery";

const GallerySection = () => {
  const {
    uploadedFiles,
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
  } = useGallery();
  const { isOpen, openModal, closeModal } = useModal();

  const imageUrls = galleryImages.map((image) => image.url);

  const canAddMoreImages = galleryImages.length + uploadedFiles.length < 9;

  if (!galleryImages.length) {
    return null;
  }

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
                  onClick={() => handleDeleteImage(image.url, image.publicId)}
                >
                  <IoIosClose className="text-2xl" />
                </Button>
                <img
                  src={image.url}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-52 object-cover object-top rounded-md"
                />
              </div>
            ))}
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative">
                <Button
                  className="absolute top-1 right-1 p-0 rounded-full text-white bg-neutral"
                  onClick={() => clearImage(index, true)}
                >
                  <IoIosClose className="text-2xl" />
                </Button>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full"
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
          onClose={() => setIsDeleteModalOpen(false)}
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
              onClick={() => setIsDeleteModalOpen(false)}
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
