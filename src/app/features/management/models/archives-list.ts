import { IResponse } from "src/app/core/models";

export interface ArchivesListResponse extends IResponse{
    result: Array<Archive>;
   }

export interface Archive{
    name: string,
    base64: string,
    type: string;
    state : number,
    companyId: number,
    group? : number,
}


export interface userByIde{
    idUser: string
}