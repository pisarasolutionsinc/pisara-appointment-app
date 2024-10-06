import { useEffect, useState, useContext } from "react";
import { useToast } from "../contexts/ToastProvider";
import { getProjectById } from "../services/ProjectServices";
import { ProjectModel } from "../models/ProjectModel";
import { AuthContext } from "../contexts/AuthContext"; 

const useProject = () => {
  const [currentProject, setCurrentProject] = useState<ProjectModel | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchCurrentProject = async () => {
      if (!authContext?.token) return;

      setLoading(true);
      setError(null);

      try {
        const project = await getProjectById(
          "6700ed4fd06fd94a69ec3ed2",
          authContext.token
        );
        setCurrentProject(project);
      } catch (error) {
        console.error("Failed fetching project:", error);
        showToast(
          "Failed to fetch current project.",
          "error",
          "top-10 right-10"
        );
        setError("Failed to fetch project.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentProject();
  }, [authContext?.token]);

  return { currentProject, loading, error };
};

export default useProject;
