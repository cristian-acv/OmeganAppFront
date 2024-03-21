import { IResponse } from "src/app/core/models";

export interface ResponsePreLiq extends IResponse {
    result: Array<Liq>;
}


export interface LiqHistoryList {
    datos: Array<Liq>;
}


export interface Liq {
      id?: number,
      exporterDate?: Date,
      filingDate?: Date,
      liquidationDate?: Date,
      agreement?: number,
      compensatedProduct?: string,
      announcementNumber?: 5,
      announcementDate?: Date,
      idDestinationCountry?: number,
      destinationCountry?: string,
      exporter?: string,
      state?: number,
      companyId?: number,
      trm?: number,
      productCompensated?: string,
      monthCompensate?: string,
      tariffItem?: number,
      description?: string ,
      kilogramsExported?: number,
      offsetKilogram?: number,
      offsetValueKilogram?: number,
      compensationValue?: number,
      currentValue?: number

}




