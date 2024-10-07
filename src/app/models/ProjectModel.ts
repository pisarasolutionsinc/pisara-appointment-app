import { BoardModel } from "./BoardModel";
import { FieldModel } from "./FieldModel";
import { ItemModel } from "./ItemModel";
import { PortalModel } from "./PortalModel";
import { UserModel } from "./UserModel";
import { WorkflowModel } from "./WorkflowModel";

export interface ProjectModel {
  _id: string;
  owner?: UserModel;
  name: string;
  description?: string;
  key?: string;
  statusNotes?: {
    summary: string;
    details: string;
    date: string;
  }[];
  type?: string;
  tags?: string[];
  services?: {
    type: string;
  };
  startDate?: string;
  endDate?: string;
  image?: string;
  attachments?: string;
  details?: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  members?: {
    role: "admin" | "user" | "viewer";
    userId: UserModel;
    permissions: "read" | "write" | "delete";
  }[];
  itemTypes?: {
    type: ItemModel;
    fields: FieldModel[];
    workflow: WorkflowModel;
  }[];
  portal?: PortalModel[];
  board?: BoardModel;
  projectCounter?: number;

  metadata?: {
    branding: {
      logo: any;
    };
  };
}
