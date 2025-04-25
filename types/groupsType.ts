import { User } from "./authType";

 export interface GroupsType {
  _id: string;
  name: string;
  description: string;
  members: User[];
  createdBy: User;
  groupPicture: string;
  createdAt: string;
  updatedAt: string;
  __v?:number
}
