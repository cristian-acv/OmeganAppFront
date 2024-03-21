import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';

@Component({
  selector: 'app-navbar-style-three',
  templateUrl: './navbar-style-three.component.html',
  styleUrls: ['./navbar-style-three.component.scss']
})
export class NavbarStyleThreeComponent implements OnInit {
  public products : boolean = true;
  public trm :  boolean = true;
  public countries : boolean = true;
  public name : string = '';
  constructor(private _jwtService:JwtService,private _router: Router) { }

  ngOnInit(): void {

    const decodeToken = this._jwtService.DecodeToken(localStorage.getItem('token'));

    var rol = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
     
    var resul= localStorage.getItem('NombreRol');

    if (rol=="Representante Legal"){
      var resul= localStorage.getItem('NombreCorreo');
    }

    if(this.name != null && this.name != undefined){
      this.name = resul;
    }

    if(rol!="Representante Legal"){
      this.products = false;
      this.trm = false;
      this.countries = false;
    }
  }

  Salir(){
    localStorage.clear();
 }

 validarInicio(){

  var rol= localStorage.getItem('NombreRol');

  if (rol == "Representante Legal") {
    this._router.navigate(['/announcements']);
  } else {
    this._router.navigate(['/companies']);
  }
 }
}
