import { IResponse } from "src/app/core/models";

export interface Trm {
    id?: number,
    trmValue?: number,
    numberCompanies?: number,
    monthlyBudget?: number,
    initialDivision?:number
}


export interface TrmResponse extends IResponse {
    result: Array<Trm>;
}

export interface UpdateTrmResponse extends IResponse{
    result: string
}
