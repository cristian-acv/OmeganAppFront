import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterResponse } from 'src/app/core/models/user-reponse';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import Swal from 'sweetalert2';
import { Login } from '../../models';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;

  constructor(public fb: FormBuilder,
    private _router: Router,
    private _loginService: LoginService,
    private _jwtService: JwtService) { }

  registrationForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[`~!@#$%^&\\\\*\\\\(\\\\)\\\\-_=\\\\+\\\\{\\\\}\\\\[\\\\]|\\\\\\\\:;"\\<>,\\\\.?\\\\/]).{8,}')
      ]
    ]
  });

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    let requestLogin: Login = {
      ...this.registrationForm.value
    };

    await this.register(requestLogin)
  }



  public async register(request: Login) {

    var response = await this._loginService.login(request)

    if (response.success) {

      const decodeToken = this._jwtService.DecodeToken(response.result.token);

      var rol = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      localStorage.setItem('NombreRol', rol);
      localStorage.setItem('NombreCorreo', response.result.email);
      if (rol == "Representante Legal") {
        localStorage.setItem('UsercompanyId', response.result.id);
        this._router.navigate(['/announcements']);
      } else {
        this._router.navigate(['/companies']);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.message
      })
    }
  }

  // Getter method to access formcontrols
  get myForm() {
    return this.registrationForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.registrationForm.reset();
  }
}
