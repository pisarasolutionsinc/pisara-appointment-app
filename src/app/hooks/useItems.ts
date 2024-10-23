import { useState } from "react";
import { ItemModel } from "../models/ItemModel";
import { useToast } from "../contexts/ToastProvider";
import { ItemService } from "../services/ItemService";

const useItems = () => {
  const [item, setItem] = useState<ItemModel | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const itemService = new ItemService();

  const fetchItemById = async (itemId: string) => {
    setLoading(true);
    itemService.resetQuery();
    try {
      const data = await itemService
        .select([
          "attachments",
          "fields",
          "comments",
          "children",
          "workflowId",
          "number",
          "assignees",
        ])
        .populate([
          { path: "assignees" },
          { path: "fields.common.fieldId" },
          { path: "fields.custom.fieldId" },
          { path: "children" },
        ])
        .getItemById(itemId);

      setItem(data);
    } catch (error) {
      showToast("Failed to fetch item.", "error", "top-20 right-10");
      console.error("Failed fetching item:", error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: ItemModel) => {
    setLoading(true);

    try {
      const createdItem = await itemService.createItem(itemData);
      showToast("Item created successfully!", "success", "top-20 right-10");
      return createdItem;
    } catch (error) {
      showToast("Failed to create item.", "error", "top-20 right-10");
      console.error("Error creating item:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemData: ItemModel) => {
    setLoading(true);
    try {
      const createdItem = await itemService.updateItem(itemData);
      showToast("Updated Item successfully!", "success", "top-20 right-10");
      return createdItem;
    } catch (error) {
      showToast("Failed to update item.", "error", "top-20 right-10");
      console.error("Error updating item:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addChildItem = async (itemData: ItemModel) => {
    setLoading(true);
    try {
      const createdItem = await itemService.addChild(itemData);
      showToast("Added Child Item successfully!", "success", "top-20 right-10");
      return createdItem;
    } catch (error) {
      showToast("Failed to add child item.", "error", "top-20 right-10");
      console.error("Error adding child item:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchItemById,
    createItem,
    updateItem,
    addChildItem,
    item,
    loading,
  };
};

export default useItems;
