import { User } from "./authType";
import { GroupsType } from "./groupsType";

export interface TasksType{
_id:string;
title:string;
description:string,
assignedTo:User;
votes:{userId:string, vote:boolean}
dueDate:string;
status:string;
isCompleted:boolean;
group:GroupsType;
createdAt: string;
updatedAt: string;
__v?:number

}




