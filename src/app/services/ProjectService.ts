import { API_ENDPOINTS } from "../config/endpointConfig";
import { ProjectModel } from "../models/ProjectModel";
import { useAsyncFetch } from "../utils/AsyncFetch";
import { APIService } from "./APIService";

export class ProjectService extends APIService {
  asyncFetch = useAsyncFetch();

  getAllProjects = async (): Promise<ProjectModel[]> => {
    try {
      const response = await this.asyncFetch.get(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.GET_ALL}${this.query}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  getProjectById = async (id: string): Promise<ProjectModel> => {
    try {
      const response = await this.asyncFetch.get(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.GET_BY_ID.replace(
          ":id",
          id
        )}${this.query}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  getLatestProject = async (): Promise<ProjectModel> => {
    try {
      const response = await this.asyncFetch.get(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.GET_LATEST}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  createProject = async (projectData: ProjectModel): Promise<ProjectModel> => {
    try {
      const response = await this.asyncFetch.post(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.CREATE}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  updateProject = async (projectData: ProjectModel): Promise<ProjectModel> => {
    try {
      const response = await this.asyncFetch.put(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.UPDATE}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  deleteProject = async (id: string): Promise<ProjectModel> => {
    try {
      const response = await this.asyncFetch.delete(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.REMOVE_BY_ID.replace(
          ":id",
          id
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  searchProject = async (params: any): Promise<ProjectModel[]> => {
    try {
      const response = await this.asyncFetch.put(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.PROJECT.SEARCH}${this.query}`,
        {
          headers: {
            "Content-Type": "application/json",
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
}
