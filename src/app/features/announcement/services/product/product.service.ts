import { Injectable } from '@angular/core';
import { typeApi, typeRequest } from 'src/app/core/enums';
import { ApiService } from 'src/app/core/services/api/api.service';
import { DeleteProductResponse, Product, ProductResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  token: string;

  constructor(
    private _apiService: ApiService) { }

  public async GetProducts(): Promise<ProductResponse> {

    let result = await this._apiService.getDataPromise<any,ProductResponse>(
      typeApi.default,
      '/Product/GetProducts',
      typeRequest.Get,
    );
    return result;
  }

  public async UpdateProduct(country:Product): Promise<DeleteProductResponse> {
    let result = await this._apiService.getDataPromise<Product,DeleteProductResponse>(
      typeApi.default,
      `/Product/UpdateProducts`,
      typeRequest.Put,
      country
    );
    return result;
  }

  public async AddProduct(country:Product): Promise<DeleteProductResponse> {
    let result = await this._apiService.getDataPromise<Product,DeleteProductResponse>(
      typeApi.default,
      `/Product/RegisterProducts`,
      typeRequest.Post,
      country
    );
    return result;
  }

  public async DeleteProduct(id:number): Promise<DeleteProductResponse> {    
    let result = await this._apiService.getDataPromise<any,DeleteProductResponse>(
      typeApi.default,
      `/Product/${id}`,
      typeRequest.Delete,
    );
    return result;
  }
}