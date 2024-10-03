import { API_ENDPOINTS } from "../config/endpointConfig";
import { ProjectModel } from "../models/ProjectModel";

export const getAllProjects = async (): Promise<ProjectModel[]> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.GET_ALL}`,
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

    const data: ProjectModel[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting all items:", error);
    throw error;
  }
};

export const getProjectById = async (id: string): Promise<ProjectModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.GET_ALL.replace(
        ":id",
        id
      )}}`,
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

    const data: ProjectModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting all items:", error);
    throw error;
  }
};
