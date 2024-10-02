import { API_ENDPOINTS } from "../config/endpointConfig";
import { ItemModel } from "../models/ItemModel";
import { ProjectModel } from "../models/ProjectModel";

export const getAllItems = async (): Promise<ItemModel[]> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.GET_ALL}`,
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

    const data: ItemModel[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting all items:", error);
    throw error;
  }
};

export const getItemById = async (id: string): Promise<ItemModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.GET_BY_ID.replace(
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

    const data: ItemModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting all items:", error);
    throw error;
  }
};

export const createItem = async (itemData: ItemModel): Promise<ItemModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.CREATE}`,
      {
        method: "POST",
        headers: {
          "Contet-Type": "application/json",
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

export const updateItem = async (itemData: ItemModel): Promise<ItemModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.CREATE}`,
      {
        method: "PUT",
        headers: {
          "Contet-Type": "application/json",
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

export const deletetem = async (id: string): Promise<ItemModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.REMOVE_BY_ID.replace(
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

    const data: ItemModel = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const addChild = async (itemData: ItemModel): Promise<ItemModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.ADD_CHILD}`,
      {
        method: "PUT",
        headers: {
          "Contet-Type": "application/json",
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

export const updateItemStatus = async (itemData: ItemModel): Promise<ItemModel> => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.MOVE_STATUS}`,
        {
          method: "PUT",
          headers: {
            "Contet-Type": "application/json",
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

export const getItemsByProjectId = async (
  projectId: ProjectModel
): Promise<ItemModel> => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.GET_BY_PROJECT_ID}`,
      {
        method: "GET",
        headers: {
          "Contet-Type": "application/json",
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

export const searchItem = async (params: any): Promise<ItemModel[]> => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.ADD_CHILD}`,
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
  
      const data: ItemModel[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error searching item:", error);
      throw error;
    }
  };