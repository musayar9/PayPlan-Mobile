import { User } from "./authType";
import { GroupsType } from "./groupsType";

export interface TasksType{
_id:string;
title:string;
description:string,
assignedTo:User;
dueDate:string;
status:string;
isCompleted:boolean;
group:GroupsType;
createdAt: string;
updatedAt: string;
__v?:number

}




