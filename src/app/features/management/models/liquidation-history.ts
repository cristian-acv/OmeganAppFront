import { Time } from "@angular/common";
import { IResponse } from "src/app/core/models";

export interface LiquidationHistoryResponse extends IResponse {
    result: Array<LiquidationHistory>;
}

export interface LiquidationHistory{
    id? : number,
    jsonDate? : string,
    fechaRegistro? : Time
}
