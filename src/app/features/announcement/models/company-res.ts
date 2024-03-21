import { IResponse } from "src/app/core/models";
import { Archive } from "../../auth/models";
import { Announcement, AnnouncementDetail } from "./announcement";

export interface CompanyResResponse extends IResponse{
    result: CompanyRes;
   }


export interface CompanyRes{
    id : number,
    nameCompany?: string,
    nit?: string,
    city?: string,
    addres?: string,
    userid?: string;
    state: number,
    archives? : Array<Archive>,
    announcements: Array<AnnouncementDetail>
}