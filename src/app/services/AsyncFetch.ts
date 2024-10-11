import { getLocal } from "../hooks/useLocalStorage";

type Method = "get" | "post" | "put" | "patch" | "delete";

const fetchRequest = async (
  method: Method,
  url: string,
  init: RequestInit = {}
) => {
  const token = getLocal("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    ...init.headers,
  };

  try {
    const response = await fetch(url, {
      ...init,
      method: method.toUpperCase(),
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      throw new Error("Failed to parse JSON response");
    }
  } catch (error) {
    console.error(`Fetch error: `, error);
    throw error;
  }
};

export const asyncFetch = {
  get: (url: string, init?: RequestInit) => fetchRequest("get", url, init),
  post: (url: string, init?: RequestInit) => fetchRequest("post", url, init),
  put: (url: string, init?: RequestInit) => fetchRequest("put", url, init),
  patch: (url: string, init?: RequestInit) => fetchRequest("patch", url, init),
  delete: (url: string, init?: RequestInit) =>
    fetchRequest("delete", url, init),
};
