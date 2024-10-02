import { API_ENDPOINTS } from "../config/endpointConfig";
import { UserModel } from "../models/UserModel";

export const getUser = async (): Promise<UserModel[]> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.GET_BY_ID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserModel[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getAllUser = async (): Promise<UserModel[]> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.GET_ALL}`,
      {
        method: "GET",
        headers: {
          "Contet-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserModel[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const createUser = async (user: UserModel): Promise<UserModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.CREATE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (user: UserModel): Promise<UserModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.UPDATE}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const removeUser = async (id: string): Promise<UserModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.REMOVE.replace(":id", id)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{ user: UserModel; token: string }> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.LOGIN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.LOGOUT}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const checkLogin = async (): Promise<UserModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.CHECKLOGIN}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const searchUser = async (search: string): Promise<UserModel[]> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.SEARCH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserModel[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
