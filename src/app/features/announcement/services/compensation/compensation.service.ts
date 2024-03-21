import { Injectable } from '@angular/core';
import { typeApi, typeRequest } from 'src/app/core/enums';
import { ApiService } from 'src/app/core/services/api/api.service';
import { CompensationRegisterResponse } from 'src/app/features/auth/models';
import { Compensation, CompensationResResponse, CompensationUpdateByIdByState, CompensationUpdateByIdByStateResponse, CompensationUpdate } from '../../models';
import { UpdateCompensationResponse } from 'src/app/features/management/models';

@Injectable({
  providedIn: 'root'
})
export class CompensationService {

  constructor(
    private _apiService: ApiService) { }

  public async RegisterCompensation(request:Compensation): Promise<CompensationRegisterResponse> {

    let result = await this._apiService.getDataPromise<Compensation,CompensationRegisterResponse>(
      typeApi.default,
      `/Compensation/RegisterCompensation`,
      typeRequest.Post,
      request
    );
    return result;
  }

  public async GetCompensationsById(id:Number): Promise<CompensationResResponse> {

    let result = await this._apiService.getDataPromise<Compensation,CompensationResResponse>(
      typeApi.default,
      `/Compensation/GetCompensationsById?id=${id}`,
      typeRequest.Get
    );
    return result;
  }

  public async UpdateObservationCompensationById(request:CompensationUpdate): Promise<CompensationUpdateByIdByStateResponse> {

    let result = await this._apiService.getDataPromise<CompensationUpdate,CompensationUpdateByIdByStateResponse>(
      typeApi.default,
      `/Compensation/UpdateCompensationObservation`,
      typeRequest.Put,
      request
    );
    return result;
  }

  public async UpdateStateAnnouncementById(request:CompensationUpdateByIdByState): Promise<CompensationUpdateByIdByStateResponse> {

    let result = await this._apiService.getDataPromise<CompensationUpdateByIdByState,CompensationUpdateByIdByStateResponse>(
      typeApi.default,
      `/Compensation/UpdateStateCompensationById`,
      typeRequest.Put,
      request
    );
    return result;
  }

  public async DeleteCompensation(idCompensation?:number): Promise<UpdateCompensationResponse> {
    let result = await this._apiService.getDataPromise<any,UpdateCompensationResponse>(
      typeApi.default,
      `/Compensation/${idCompensation}`,
      typeRequest.Delete,
    );
    return result;
  }
}
