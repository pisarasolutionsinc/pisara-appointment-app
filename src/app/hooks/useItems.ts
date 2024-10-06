import { useEffect, useState } from "react";
import { ItemModel } from "../models/ItemModel";
import { useToast } from "../contexts/ToastProvider";
import { getAllItems } from "../services/ItemServices";
import useProject from "./useProject";

const useItems = () => {
  const { currentProject: project } = useProject();
  const [item, setItems] = useState<ItemModel[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!project) return;

        const data = await getAllItems();
        setItems(data);
      } catch (error) {
        showToast("Failed to fetch all items.", "error", "top-10 right-10");
        console.error("failed fetching all items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [project]);

  return { item, loading, error };
};

export default useItems;
