import { IResponse } from "src/app/core/models";
import { Announcement } from "../../announcement/models";

export interface CompaniesListResponse extends IResponse {
    result: Array<Company>;
}

export interface CompanyResponse extends IResponse {
    result: Company;
}


export interface Company {
    id?: number,
    nameCompany?: string,
    nit?: string,
    city?: string,
    address?: string,
    userId?: string,
    state?: number,
    announcements?: Array<Announcement>
}

export interface companyUpdate {
    id: number,
    nameCompany?: string,
    nit?: string,
    city?: string,
    address?: string,
    userId?: string,
    state: number
}