import { IResponse } from "src/app/core/models";

export interface AnnouncementDetailResponse extends IResponse {
    result: Announcement;
}


export interface AnnouncementUpdateByIdByStateResponse extends IResponse {

}


export interface Announcement {
    id?: number,
    portShipment?: string,
    destinationCountry?: string,
    idDestinationCountry?: number
    shippingDate?: Date,
    observation?: string,
    state?: number,
    companyid?: number,
    createdDate?: Date,
    productsList?: Array<productsAnnouncement>
}


export interface AnnouncementUpdate {
    id?: number,
    portShipment?: string,
    destinationCountry?: string,
    shippingDate?: Date,
    observation?: string,
    state?: number,
    companyid?: number
}

export interface AnnouncementUpdateByIdByState {
    id: number,
    state : number
}


export interface AnnouncementDos {
    portShipment?: string,
    destinationCountry?: string,
    idDestinationCountry?: number
    shippingDate?: Date,
    observation?: string,
    state?: number,
    companyid?: number,
    productsAnnouncement?: Array<productsAnnouncement>
}


export interface productsAnnouncement {
    Id?: number,
    kilogram?: string
}


export interface AnnouncementDetail {
    id?: number
    portShipment?: string,
    destinationCountry?: string,
    idDestinationCountry?: number
    shippingDate?: Date,
    observation?: string,
    state?: number,
    companyid?: number,
    productsList?: Array<productsAnnouncement>
} 
