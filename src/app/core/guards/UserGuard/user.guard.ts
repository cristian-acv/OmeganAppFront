import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/features/auth/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private _loginService: LoginService,
    private router: Router
   ) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
  ) {
    const isAuth = this._loginService.isAuthorized();
    if (!isAuth) {
      this.router.navigateByUrl('/');
    }
    return this._loginService.isAuthorized();
  }
  
}
