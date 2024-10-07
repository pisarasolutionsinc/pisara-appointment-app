import { useEffect, useState, useContext } from "react";
import { useToast } from "../contexts/ToastProvider";
import {
  getProjectById,
  updateProject as updateProjectService,
} from "../services/ProjectServices";
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
          "67039738e07641359d3992f5",
          authContext.token
        );
        setCurrentProject(project);
      } catch (error) {
        console.error("Failed fetching project:", error);
        showToast(
          "Failed to fetch current project.",
          "error",
          "top-20 right-10"
        );
        setError("Failed to fetch project.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentProject();
  }, [authContext?.token]);

  const updateProject = async (projectData: ProjectModel) => {
    if (!authContext?.token) {
      showToast("Unauthorized: No token found.", "error", "top-20 right-10");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedProject = await updateProjectService(
        projectData,
        authContext.token
      );
      setCurrentProject(updatedProject);
      showToast("Project updated successfully.", "success", "top-20 right-10");
    } catch (error) {
      console.error("Failed updating project:", error);
      showToast("Failed to update project.", "error", "top-20 right-10");
      setError("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  return { currentProject, updateProject, loading, error };
};

export default useProject;
