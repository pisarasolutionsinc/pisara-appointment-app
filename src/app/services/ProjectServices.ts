import { API_ENDPOINTS } from "../config/endpointConfig";
import { ProjectModel } from "../models/ProjectModel";
import { QueryBuilder } from "./QueryBuilder";

const queryParams = new QueryBuilder()
  .select([
    "name",
    "key",
    "details",
    "owner",
    "description",
    "image",
    "itemTypes.type",
    "members",
    "startDate",
    "endDate",
  ])
  .populate([
    "owner",
    "itemTypes.workflow",
    "itemTypes.fields",
    "itemTypes.type",
    "owner",
    "members.userId",
    "board",
  ])
  .sort("-createdAt")
  .build(true);

export const getAllProjects = async (): Promise<ProjectModel[]> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.GET_ALL}?${queryParams}`,
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
    console.error("Error fetching all projects:", error);
    throw error;
  }
};

export const getProjectById = async (
  id: string,
  token: string
): Promise<ProjectModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.GET_BY_ID.replace(
        ":id",
        id
      )}?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProjectModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const getLatestProject = async (): Promise<ProjectModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.GET_LATEST}?${queryParams}`,
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
    console.error("Error fetching latest project:", error);
    throw error;
  }
};

export const createProject = async (
  projectData: ProjectModel
): Promise<ProjectModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.CREATE}`,
      {
        method: "POST",
        headers: {
          "Contet-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProjectModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (
  projectData: ProjectModel
): Promise<ProjectModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.UPDATE}`,
      {
        method: "PUT",
        headers: {
          "Contet-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProjectModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<ProjectModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.REMOVE_BY_ID.replace(
        ":id",
        id
      )}}`,
      {
        method: "DELETE",
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
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const searchProject = async (params: any): Promise<ProjectModel[]> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.SEARCH}`,
      {
        method: "PUT",
        headers: {
          "Contet-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProjectModel[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching project:", error);
    throw error;
  }
};
