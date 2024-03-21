import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/features/auth/services/login/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {    
    const authService = this.injector.get(this._loginService);
    const copiedReq = req.clone({
      headers: req.headers.set(
        'authorization', 'Bearer ' + authService.token
      )
    });
    
    if (!authService.token) {
      this._router.navigate(['']);;
    }

    return next.handle(copiedReq);
  }
}
