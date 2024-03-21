import { IResponse } from "src/app/core/models"

export interface User{
    fullname?: string,
    email?: string,
    phonenumber?: string,
    username?: string,
    password?: string,
    rolname?:string
}


export interface UserTwo{
    userId? : string
    fullName?: string,
    email?: string,
    phonenumber?: string,
    phoneNumber?: string
}


export interface UserByIdResponse extends IResponse{
    result : UserTwo
}
