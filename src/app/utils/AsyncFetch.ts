import { useLocalStorage } from "../hooks/useLocalStorage";

type TAsyncFetch = {
  get: typeof fetch;
  post: typeof fetch;
  put: typeof fetch;
  patch: typeof fetch;
  delete: typeof fetch;
};

const methods = ["get", "post", "put", "patch", "delete"];

export const useAsyncFetch = () => {
  const { getLocal } = useLocalStorage();
  const token = getLocal("token");

  return methods.reduce((acc, method) => {
    return {
      ...acc,
      [method]: async (url: string, init?: RequestInit) =>
        fetch(url, {
          ...init,
          method: method.toUpperCase(),
          headers: {
            Authorization: `Bearer ${token}`,
            ...init?.headers,
          },
        }),
    };
  }, {} as TAsyncFetch);
};
