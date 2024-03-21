import { Injectable, NgModule } from '@angular/core';
import jwtDecode from 'jwt-decode';


@Injectable()
@NgModule()

export class JwtService {

  constructor() { }

  DecodeToken(token: string) : string {
    return jwtDecode(token)
  }
}
