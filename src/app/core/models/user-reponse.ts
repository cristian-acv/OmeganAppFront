import { IResponse } from "./response";



export interface UserRegisterResponse extends IResponse{
   result: userResgister;
  }

 export interface userResgister {
  id:string,
  userId : string,
  username :string,
  email: string,
  token : string
 } 