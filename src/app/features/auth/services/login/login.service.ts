import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { typeApi, typeRequest } from 'src/app/core/enums';
import { UserRegisterResponse } from 'src/app/core/models/user-reponse';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Login } from '../../models';
import { recoverPassword, recoverPasswordResponse } from '../../models/recover-password';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string = localStorage.getItem('token');;

  constructor(
    private _apiService: ApiService,
    private router: Router) { }

  public async login(request: Login): Promise<UserRegisterResponse> {

    let res = await this._apiService.getDataPromise<Login, UserRegisterResponse>(
      typeApi.default,
      '/Account/Login',
      typeRequest.Post,
      request
    );

    this.token = res.result.token;

    localStorage.setItem('userid', res.result.id);
    localStorage.setItem('token', this.token);
    
    
    return res;
  }

  public async recover(request: recoverPassword): Promise<recoverPasswordResponse> {

    let res = await this._apiService.getDataPromise<Login, recoverPasswordResponse>(
      typeApi.default,
      '/Account/ChangePassword',
      typeRequest.Post,
      request
    );
  
    return res;
  }

  logout() {
    this.token = null;
    this.router.navigateByUrl('login');
  } 

  isAuthorized() {
    // Just check if token exists
    // It not, user has never logged in current session
    return Boolean(this.token);
  }
  
}
