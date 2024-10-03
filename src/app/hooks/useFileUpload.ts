import { useState } from "react";
import {
  removeFileFromCloudinary,
  uploadFileToCloudinary,
} from "../services/CloudinaryServices";

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // uploadFile function to upload image to Cloudinary
  const uploadFile = async (imageBlob: Blob, folderName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await uploadFileToCloudinary(imageBlob, folderName);
      return result;
    } catch (err) {
      setError((err as Error)?.message || "Upload failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // removeFile function to remove image from Cloudinary
  const removeFile = async (publicId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await removeFileFromCloudinary(publicId);
      return result;
    } catch (err) {
      setError((err as Error)?.message || "Remove failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadFile, removeFile, isLoading, error };
};
