export interface FieldModel {
  _id: string;
  name: string;
  type:
    | "singletext"
    | "multitext"
    | "number"
    | "date"
    | "singleselect"
    | "multipleselect"
    | "iteration"
    | "user"
    | "calculated"
    | "item"
    | "object";
  category: "common" | "custom";
  value: any;
}
