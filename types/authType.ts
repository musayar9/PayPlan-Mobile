export interface User {
    name: string;
    surname: string;
    email: string;
    profilePicture:string;
    groups: any[];
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface AuthResponse {
    message: string;
    User: User;
    token: string;
  }
  