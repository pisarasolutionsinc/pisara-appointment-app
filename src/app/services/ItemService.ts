import { API_ENDPOINTS } from "../config/endpointConfig";
import { ItemModel } from "../models/ItemModel";
import { ProjectModel } from "../models/ProjectModel";
import { useAsyncFetch } from "../utils/AsyncFetch";
import { APIService } from "./APIService";

export class ItemService extends APIService {
  asyncFetch = useAsyncFetch();

  getAllItems = async (): Promise<ItemModel[]> => {
    try {
      const response = await this.asyncFetch.get(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.GET_ALL}${this.query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ItemModel[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting all items:", error);
      throw error;
    }
  };

  getItemById = async (id: string): Promise<ItemModel> => {
    try {
      const response = await this.asyncFetch.get(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.GET_BY_ID.replace(
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

      const data: ItemModel = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting all items:", error);
      throw error;
    }
  };

  createItem = async (itemData: ItemModel): Promise<ItemModel> => {
    try {
      const response = await this.asyncFetch.post(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.CREATE}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ItemModel = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  };

  updateItem = async (itemData: ItemModel): Promise<ItemModel> => {
    try {
      const response = await this.asyncFetch.put(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.UPDATE}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ItemModel = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  };

  deleteItem = async (id: string): Promise<ItemModel> => {
    try {
      const response = await this.asyncFetch.delete(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.REMOVE_BY_ID.replace(
          ":id",
          id
        )} `,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ItemModel = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  };

  addChild = async (itemData: ItemModel): Promise<ItemModel> => {
    try {
      const response = await this.asyncFetch.put(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.ADD_CHILD}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ItemModel = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding child item:", error);
      throw error;
    }
  };

  updateItemStatus = async (itemData: ItemModel): Promise<ItemModel> => {
    try {
      const response = await this.asyncFetch.put(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.MOVE_STATUS}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ItemModel = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating child item:", error);
      throw error;
    }
  };

  getItemsByProjectId = async (projectId: ProjectModel): Promise<ItemModel> => {
    try {
      const response = await this.asyncFetch.get(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.GET_BY_PROJECT_ID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectId),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ItemModel = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting items by project id:", error);
      throw error;
    }
  };

  searchItem = async (params: any): Promise<ItemModel[]> => {
    try {
      const response = await this.asyncFetch.post(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.SEARCH}`,
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

      const data: ItemModel[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error searching item:", error);
      throw error;
    }
  };
}
