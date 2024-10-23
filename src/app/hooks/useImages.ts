import { useState } from "react";

const useImages = () => {
  const [hasImages, setHasImages] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleFileUpload = (files: File | File[]) => {
    if (Array.isArray(files)) {
      if (files.length > 0) {
        handleSingleImageUpload(files[0]);
      }
    } else {
      handleSingleImageUpload(files);
    }
  };

  const handleSingleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setHasImages(imageUrl);
    setUploadedImage(file);
  };

  const clearImage = () => {
    setHasImages(null);
    setUploadedImage(null);
  };

  return {
    hasImages,
    setHasImages,
    uploadedImage,
    handleFileUpload,
    clearImage,
  };
};

export default useImages;
