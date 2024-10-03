import { FieldModel } from "./FieldModel";
import { StatusModel } from "./StatusModel";

export interface ItemTypeModel {
  _id: string;
  name: string;
  icon: string;
  defaultFields: FieldModel;
  statuses: StatusModel;
}
