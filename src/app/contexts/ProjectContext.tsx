import { createContext, PropsWithChildren, useState } from "react";
import { ProjectModel } from "../models/ProjectModel";

interface ProjectContextType {
  project: Pick<
    ProjectModel,
    "_id" | "name" | "description" | "image" | "key" | "attachments"
  >;
  setProject: React.Dispatch<
    React.SetStateAction<
      Pick<
        ProjectModel,
        "_id" | "name" | "description" | "image" | "key" | "attachments"
      >
    >
  >;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

type ProjectProviderProps = PropsWithChildren & {};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [project, setProject] = useState<
    Pick<
      ProjectModel,
      "_id" | "name" | "description" | "image" | "key" | "attachments"
    >
  >({
    _id: "",
    name: "",
    description: "",
    image: "",
    key: "",
    attachments: [],
  });

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
