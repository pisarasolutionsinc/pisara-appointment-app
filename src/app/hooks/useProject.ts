// import { useParams } from "react-router-dom";
import { ProjectModel } from "../models/ProjectModel";
import { useEffect, useState } from "react";
import { ProjectService } from "../services/ProjectService";
import { useToast } from "../contexts/ToastProvider";

interface Status {
  _id: string;
  name: string;
  category: string;
}

type Field = {
  _id: any;
  fieldId: any;
  name?: string;
  category?: string;
};

type GetCurrentProjectFieldsParams = {
  itemType?: string;
  exclusions?: string[];
};

export const useProject = () => {
  //   const { projectKey } = useParams();
  const projectId = "67039738e07641359d3992f5";
  const projectService = new ProjectService();
  const [currentProject, setCurrentProject] = useState<ProjectModel | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCurrentProject = async () => {
      setLoading(true);
      setError(null);
      projectService.resetQuery();

      try {
        const project = await projectService
          .select([
            "name",
            "key",
            "details",
            "owner",
            "description",
            "image",
            "itemTypes",
            "attachments",
            "members",
            "startDate",
            "endDate",
          ])
          .populate([
            { path: "owner" },
            { path: "itemTypes.workflow" },
            { path: "itemTypes.fields" },
            { path: "itemTypes.type" },
            { path: "members.userId" },
            { path: "board" },
          ])
          .getProjectById(projectId!);

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
  }, [projectId]);

  const updateProject = async (projectData: Partial<ProjectModel>) => {
    setLoading(true);
    setError(null);

    try {
      const updatedProject: ProjectModel = {
        _id: currentProject!._id,
        owner: currentProject!.owner,
        name: projectData.name || currentProject!.name,
        description:
          projectData.description || currentProject?.description || "",
        attachments:
          projectData.attachments || currentProject?.attachments || [],
        key: currentProject!.key,
      };

      const savedProject = await projectService.updateProject(updatedProject);

      setCurrentProject(savedProject);

      showToast("Project updated successfully.", "success", "top-20 right-10");
    } catch (error) {
      console.error("Failed updating project:", error);
      showToast("Failed to update project.", "error", "top-20 right-10");
      setError("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  function ucFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getProjectsByItemTypeName(
    projects: any[],
    itemTypeName: string
  ): any[] {
    return projects.filter((project) =>
      project.itemTypes.some(
        (itemType: any) => itemType.type.name === itemTypeName
      )
    );
  }

  function getCurrentProjectStatuses(currentProject: ProjectModel | null):
    | Array<{
        id: string;
        title: string;
        column: string;
        category: string;
      }>
    | undefined {
    if (!currentProject || !currentProject.itemTypes) return;

    const allStatuses: Status[] = currentProject.itemTypes.flatMap(
      (itemType: any) => itemType.workflow?.statuses || []
    );

    return Array.from(new Set(allStatuses.map((status) => status.name)))
      .map((name) => allStatuses.find((status) => status.name === name)!)
      .map((status) => ({
        id: status._id,
        title: ucFirst(status.name),
        column: status.name.toLowerCase().replace(/ /g, "-"),
        category: status.category,
      }));
  }

  function getCurrentProjectFields(
    currentProject: ProjectModel | null,
    { itemType, exclusions = [] }: GetCurrentProjectFieldsParams
  ): Field[] | undefined {
    if (
      !currentProject ||
      !currentProject.itemTypes ||
      currentProject.itemTypes.length === 0
    ) {
      return;
    }

    const commonFields: any[] = currentProject.itemTypes[0].fields.filter(
      (field: any) =>
        !exclusions.includes(field.name) && field.category === "common"
    );

    const customFields: any[] = itemType
      ? currentProject.itemTypes
          .find((itemTypeEntry: any) => itemTypeEntry.type.name === itemType)
          ?.fields.filter(
            (field: any) =>
              !exclusions.includes(field.name) && field.category === "custom"
          ) || []
      : [];

    return [...commonFields, ...customFields];
  }

  function getCurrentProjectCommonFields(
    currentProject: ProjectModel | null,
    { exclusions = [] }: GetCurrentProjectFieldsParams
  ): Field[] | undefined {
    if (
      !currentProject ||
      !currentProject.itemTypes ||
      currentProject.itemTypes.length === 0
    ) {
      return;
    }

    const commonFields: any[] = currentProject.itemTypes[0].fields.filter(
      (field: any) =>
        !exclusions.includes(field.name) && field.category === "common"
    );

    return [...commonFields];
  }

  function getCurrentProjectCustomFields(
    currentProject: ProjectModel | null,
    { itemType, exclusions = [] }: GetCurrentProjectFieldsParams
  ): Field[] | undefined {
    if (
      !currentProject ||
      !currentProject.itemTypes ||
      currentProject.itemTypes.length === 0
    ) {
      return;
    }

    const customFields: any[] = itemType
      ? currentProject.itemTypes
          .find((itemTypeEntry: any) => itemTypeEntry.type.name === itemType)
          ?.fields.filter(
            (field: any) =>
              !exclusions.includes(field.name) && field.category === "custom"
          ) || []
      : [];

    return [...customFields];
  }

  return {
    updateProject, 
    currentProject,
    loading,
    error,
    getCurrentProjectStatuses,
    getCurrentProjectFields,
    getCurrentProjectCommonFields,
    getCurrentProjectCustomFields,
    getProjectsByItemTypeName,
  };
};
