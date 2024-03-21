import { IResponse } from "src/app/core/models";

export interface PreAprovadoResponse extends IResponse {
    result: preAprovado;
}

export interface preAprovadoList {
    datos: Array<preAprovado2>;
}


export interface preAprovado2{
    lstPreapproved? : Array<detallePre2>,
    lstRound1? : Array<detallePre2>,
    lstRound2? : Array<detallePre2>,
    lstFinal? : Array<detallePre2>,
    totalPreaprobado? : number,
    excedente1? : number,
    excedente2? : number,
    totalRound1? : number,
    totalRound2? : number
}

export interface detallePre2{
    Company?: string,
    Amount?: 0,
    Percent?: 100,
    DatosTotales?: any
}





export interface preAprovado{
    lstPreapproved? : Array<detallePre>,
    lstRound1? : Array<detallePre>,
    lstRound2? : Array<detallePre>,
    lstFinal? : Array<detallePre>,
    totalPreaprobado? : number,
    excedente1? : number,
    excedente2? : number,
    totalRound1? : number,
    totalRound2? : number
}

export interface detallePre{
    company?: string,
    amount?: 0,
    percent?: 100,
    datosTotales?: any
}


export interface OrderPreList2 {
    OrderPre?: Array<Array<OrderPre>>;
}

export interface OrderPre{
    company?: string,
    compesation?: number,
    oneRound?: number,
    twoRound?: number,
    final?: number
    percent?: number
}


