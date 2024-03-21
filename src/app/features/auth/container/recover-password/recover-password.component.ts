import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterResponse } from 'src/app/core/models/user-reponse';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import Swal from 'sweetalert2';
import { Login } from '../../models';
import { recoverPassword } from '../../models/recover-password';
import { LoginService } from '../../services/login/login.service';
import { resetPassword } from 'src/app/features/auth/models';
import { RegistrationService } from '../../services/registration/registration.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  submitted = false;

  constructor(public fb: FormBuilder,
    private _router: Router,
    private _loginService: LoginService,
    private _registerService: RegistrationService,
    private _jwtService: JwtService) { }    

  registrationForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],    
  });

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    let requestLogin: recoverPassword = {
      ...this.registrationForm.value
    };

    await this.register(requestLogin)

  }



  public async register(request: recoverPassword) {

    let resetPassword: resetPassword = {
      email: request.email
    };

    var response = await this._registerService.ResetPassword(resetPassword);

    if (response.success) {
      await Swal.fire(
        'Exito',
        'Se envía correo con contraseña',
        'success'
      )
      this._router.navigate(['']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A ocurrido un error'
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
