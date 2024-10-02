import { FieldModel } from "./FieldModel";
import { ProjectModel } from "./ProjectModel";
import { UserModel } from "./UserModel";

export interface ItemModel {
  _id: string;
  number?: number;
  projectId?: ProjectModel;
  attachment?: {
    type: string;
    link: string;
  }[];
  images?: {
    type: string;
    link: string;
  }[];
  coverPhoto?: string;
  fields?: {
    common?: {
      fieldId: FieldModel;
      value: any;
    }[];
    custom?: {
      fieldId: FieldModel;
      value: any;
    }[];
  };
  comments?: {
    user: UserModel;
    message: string;
  }[];
  children?: ItemModel[];
  assignees?: UserModel[];
}
