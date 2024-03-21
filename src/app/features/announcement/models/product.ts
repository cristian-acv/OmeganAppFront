import { IResponse } from "src/app/core/models";

export interface ProductResponse extends IResponse{
   result: Array<Product>;
  }

 export interface Product {
  id? : number,
  tariffItem? :string,
  description?: string
 } 

 export interface DeleteProductResponse extends IResponse{
   result: string
}
