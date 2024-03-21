import { IResponse } from "src/app/core/models";

export interface CompensationUpdateByIdByStateResponse extends IResponse {

}

export interface CompensationUpdateByIdByState {
    id: number,
    state : number
}

export interface Compensation {
    destinationCountry? :string,
    idDestinationCountry? : number
    exporterDate?: Date,
    filingDate?:Date,
    announcementDate?:Date,
    observation?: string,
    state?: number,
    companyid? : number,
    ejecucion?:boolean,
    announcementNumber?: number,
    productsCompensations?: Array<productsCompensation>
    signatureRepresentative?: string,
    signatureAuditor?: string,
    trm?: string,
 
}


export interface ArchivesCom{
    signatureRepresentativeBase?: string
    signatureAuditorBase?: string,
}

export interface Compensation2 {
    id?:number,
    destinationCountry? :string,
    idDestinationCountry? : number
    exporterDate?: Date,
    filingDate?:Date,
    announcementDate?:Date,
    observation?: string,
    state?: number,
    companyid? : number,
    companyId? : number,
    ejecucion?:boolean,
    announcementNumber?: number,
    productsList?: Array<productsCompensation>
    signatureRepresentative?: string,
    signatureAuditor?: string,
    trm?: string
} 


export interface CompensationResResponse extends IResponse{
    result: Compensation2;
}

export interface productsCompensation {
    productId? : number,
    kilogramsExported? : string,
    offsetKilogram? : number,
    subtotal? : number,
    kilogram? : number,
    tariffItem? : string,
    valueCountry?: number;
    subTotal2?:number
} 

export interface CompensationUpdate {
    id?: number,
    observation?: string,
    state?: number
}

export interface  CompensationDetail{
    id?:number
    destinationCountry? :string,
    idDestinationCountry? : number
    shippingDate?: Date,
    observation?: string,
    state?: number,
    companyid? : number,
    productsList?: Array<productsCompensation>
}