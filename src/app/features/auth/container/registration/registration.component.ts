import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterResponse } from 'src/app/core/models/user-reponse';
import { getBase64EncodedFileData } from 'src/app/core/utils/encodearchive';
import Swal from 'sweetalert2';
import { Archive, Company } from '../../models';
import { User } from '../../models/user';
import { RegistrationService } from '../../services/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public archives: Archive[] = [];


  constructor(private fb: FormBuilder,
    private _registerService: RegistrationService,
    private _router: Router) {
  }

  registrationForm = this.fb.group(
    {
      user: this.fb.group({
        fullname: [
          '',
          [Validators.required
          ],
        ],
        email: [
          '',
          [Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
          ],
        ],
        //phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')],]
        phonenumber: [
          '',
          [Validators.required
          ],
        ]
      }),
      company: this.fb.group({
        namecompany: ['', Validators.required],
        nit: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required]
      }),
      archives: this.fb.group({
        chambercommerce: [null, Validators.required],
        identitydocument: [null, Validators.required],
        signagreement: [null, Validators.required],
        responsiblemanaging: [null, Validators.required],
      })
    }
  );

  submitted = false;



  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  async onSubmit(): Promise<void> {    
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    let requestUser: User = {
      ...this.registrationForm.value.user
    };

    let request: Company = {
      ...this.registrationForm.value.company
    };

    var res = await this.register(requestUser);

    request.userid = res.result.userId;

    await this.registerComapny(request)

    this.onReset();

  }

  public async register(request: User): Promise<UserRegisterResponse> {

    let indice = request.email.indexOf("@");

    request.username = request.email.substring(0, indice);

    request.password = "Colombia25+-"

    request.rolname = 'Representante Legal';

    var response = await this._registerService.registerUser(request)

    return response;

  }


  public async registerComapny(request: Company): Promise<any> {


    request.archives = this.archives;

    var response = await this._registerService.registerComapny(request)

    if (response.success) {
      await Swal.fire(
        'Exito',
        'Se realizó el registro correctamente le estaremos informando sobre su trámite vía correo electrónico',
        'success'
      )
      await this._router.navigate(['']);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Registro no realizado',
        //text: response.message
        text: "No se pudo hacer el registro. Verifique si el correo ya se encuentra registrado en el sistema"
      })
    }
  }

  public async captureFile(event): Promise<any> {

    const inputName = event.target.name;

    const archivecapture = event.target.files[0] as File

    const base64 = await getBase64EncodedFileData(archivecapture)


    let archive: Archive = {
      name: archivecapture.name,
      base64: base64,
      type: archivecapture.type,
      state: true,
      nameVali : inputName,
      group:1
    };

  
    const index = this.archives.findIndex(a => a.nameVali === inputName);

    if (index !== -1) {
      this.archives[index] = archive;
    } else {
      this.archives.push(archive);
    }
  }

  onReset(): void {
    this.submitted = false;
    this.registrationForm.reset();
  }
}
