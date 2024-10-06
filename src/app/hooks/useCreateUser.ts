import { useState } from "react";
import { createUser } from "../services/UserServices";
import { UserModel } from "../models/UserModel";
import { useToast } from "../contexts/ToastProvider";

interface UseCreateUserResponse {
  createUserHandler: (
    user: UserModel,
    onSuccessRedirect?: () => void
  ) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const useCreateUser = (): UseCreateUserResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  const createUserHandler = async (
    user: UserModel,
    onSuccessRedirect?: () => void
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createUser(user);
      setSuccess(true);
      showToast("Successfully Registered", "success", "top-20 right-10");
      if (onSuccessRedirect) {
        onSuccessRedirect();
      }
    } catch (err) {
      setError("Failed to create user. Please try again.");
      showToast("Failed to Register", "error", "top-20 right-10");
    } finally {
      setIsLoading(false);
    }
  };

  return { createUserHandler, isLoading, error, success };
};
