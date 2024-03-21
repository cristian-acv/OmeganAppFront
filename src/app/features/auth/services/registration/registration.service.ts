import { Injectable } from '@angular/core';
import { typeApi, typeRequest } from 'src/app/core/enums';
import { UserRegisterResponse } from 'src/app/core/models/user-reponse';
import { ApiService } from 'src/app/core/services/api/api.service';
import { userByIde } from 'src/app/features/management/models';
import { Company, resetPassword } from '../../models';
import { CompanyRegisterResponse } from '../../models/company-response';
import { User, UserByIdResponse } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService   {

  constructor(private _apiService: ApiService) { }

  public async registerUser(request: User): Promise<UserRegisterResponse> {

    let result = await this._apiService.getDataPromise<User, UserRegisterResponse>(
      typeApi.default,
      '/Account/Register',
      typeRequest.Post,
      request
    );

    return result;
  }

  public async registerComapny(request: Company): Promise<CompanyRegisterResponse> {

    let result = await this._apiService.getDataPromise<Company, CompanyRegisterResponse>(
      typeApi.default,
      '/Company/RegisterCompany',
      typeRequest.Post,
      request
    );

    return result;
  }

  public async ResetPassword(resetPasswordResponse: resetPassword): Promise<any> {

    let result = await this._apiService.getDataPromise<resetPassword, any>(
      typeApi.default,
      '/Account/ResetPassword',
      typeRequest.Post,
      resetPasswordResponse
    );

    return result;
  }



  public async GetUsersById(idUser: userByIde): Promise<UserByIdResponse> {

    let result = await this._apiService.getDataPromise<userByIde, UserByIdResponse>(
      typeApi.default,
      '/Account/GetUsersById',
      typeRequest.Post,
      idUser
    );

    return result;
  }

}
