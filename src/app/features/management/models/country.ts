import { IResponse } from "src/app/core/models";

export interface Country {
    id?: number,
    nameCountry?: string,
    currentValue?: number,
    state?: boolean
}


export interface CountryResponse extends IResponse {
    result: Array<Country>;
}

export interface DeleteCountryResponse extends IResponse{
    result: string
}
