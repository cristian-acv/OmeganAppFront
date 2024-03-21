import { Archive } from "./archive";

export interface Company{
    namecompany?: string,
    nit?: string,
    city?: string,
    addres?: string,
    userid?: string;
    archives? : Array<Archive>
}