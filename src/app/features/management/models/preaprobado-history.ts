import { Time } from "@angular/common";
import { IResponse } from "src/app/core/models";

export interface PreAprovadoHistoryResponse extends IResponse {
    result: Array<PreAprovadoHistory>;
}

export interface PreAprovadoHistory{
    id? : number,
    jsonDate? : string,
    fechaRegistro? : Time
}

