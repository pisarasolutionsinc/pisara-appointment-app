export interface UserModel {
  _id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  status?: "active" | "inactive" | "suspended";
  type?: "admin" | "user" | "viewer";
}
