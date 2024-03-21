import { IResponse } from "src/app/core/models"

export interface recoverPassword{
    email?: string, 
    lastPassword? : string,
    newPassword? : string
}

export interface recoverPasswordResponse extends IResponse{
    id : number
  }