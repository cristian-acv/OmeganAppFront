import { IResponse } from "src/app/core/models";

export interface ConsolidateAnnouncementResponse extends IResponse{
    result: Array<ConsolidateAnnouncementCompany>;
}
/*
export interface ConsolidateAnnouncementCompanys{
    lstCompany?: Array<ConsolidateAnnouncementCompany>
}
*/
export interface ConsolidateAnnouncementCompany{
    idCcompany?: number,
    name?: string,
    NIT?: string,
    City?: string,
    Address?: string,
    State?: number,
    UserId?: string,
    announcements?: Array<ConsolidateAnnouncementAnnouncement>
}

export interface ConsolidateAnnouncementAnnouncement{
    Id?: number,
    PortShipment?: string,
    DestinationCountry?: string,
    ShippingDate?: Date,
    CreatedDate?: Date,
    Observation?: string,
    State?: number,
    CompanyId?: number,
    productsList?: Array<ProductkDTO>,
    trm?: Trm
}

export interface ProductkDTO{
    Id?: number,
    TariffItem?: string,
    Description?: string,
    Kilogram?: number,
    OffsetKilogram?: number,
    Subtotal?: number
}

export interface Trm{
    Id?: number,
    trmValue?: number,
    MonthlyBudget?: number,
    NumberCompanies?: number,
    InitialDivision?: number,
    State?: number
}