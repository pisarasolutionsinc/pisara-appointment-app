import { useCallback } from "react";

export const uselocalStorage = () => {
  const saveToken = useCallback((token: string) => {
    localStorage.setItem("authToken", token);
  }, []);

  const getToken = useCallback((): string | null => {
    return localStorage.getItem("authToken");
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem("authToken");
  }, []);

  const savelocal = useCallback((key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const getlocal = useCallback((key: string): any | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to parse localStorage data", error);
      return null;
    }
  }, []);

  const removelocal = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return {
    savelocal,
    getlocal,
    removelocal,
    getToken,
    saveToken,
    removeToken,
  };
};
