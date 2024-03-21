import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { resetPassword, UserTwo } from 'src/app/features/auth/models';
import { RegistrationService } from 'src/app/features/auth/services/registration/registration.service';
import Swal from 'sweetalert2';
import { __awaiter } from 'tslib';
import { Archive, Company, companyUpdate, userByIde, SendEmail, SendEmailGeneral} from '../../models';
import { ArchivesDetailService } from '../../services/archives-detail/archives-detail.service';
import { CompaniesService } from '../../services/companies/companies.service';



@Component({
  selector: 'app-companie-detail',
  templateUrl: './companie-detail.component.html',
  styleUrls: ['./companie-detail.component.scss']
})
export class CompanieDetailComponent implements OnInit {

  public archivesList: Archive[] = [];
  public archivesByGroup: { [key: string]: Archive[] } = {};

  public companyDetail: Company = {};
  public user: UserTwo = {};
  public userByID: userByIde;
  public Visible: boolean = false;

  

  constructor(public fb: FormBuilder,
    private _archivesService: ArchivesDetailService,
    private _compinieService: CompaniesService,
    private _registerService: RegistrationService,
    private _jwtService: JwtService,
    private _router: Router) { }


  rejectCompanyForm = this.fb.group(
    {
      name: ['', Validators.required],
      to: ['', Validators.required],
      emailBody: ['', Validators.required]
    }
  );

  async ngOnInit(): Promise<void> {

    const decodeToken = this._jwtService.DecodeToken(localStorage.getItem('token'));

    var rol = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];


    if (rol == "Representante Legal") {
      this.Visible = false;
    }

    await this.GetArchivesByCompany();

    await this.GetCompanyById();

    await this.GetUserById();
  

    if (rol != 'Representante Legal') {
        if( this.companyDetail.state == 0)
        {
          this.Visible = true;
        }
        else if(this.companyDetail.state == 1)
        {
          var companyId = localStorage.getItem('companyId');
          let res = await this._archivesService.GetArchivesByCompany(Number(companyId));
          if(res.result.length == 5)
          {
            this.Visible = true;
          }

        }
    }
    this.groupArchives();
  }


  
  groupArchives() {
    this.archivesList.forEach(archive => {
      if (!this.archivesByGroup[archive.group]) {
        this.archivesByGroup[archive.group] = [];
      }
      this.archivesByGroup[archive.group].push(archive);
    });
  }

  getGroupName(groupNumber: number): string {
    
    const groupNames = {
      1: "Registro",
      2: "Convenio",
      3: "Exportación"};

    return groupNames[groupNumber];
  }

  

  public async GetUserById(): Promise<void> {
    this.userByID = { idUser: localStorage.getItem('UsercompanyId') };

    let res = await this._registerService.GetUsersById(this.userByID)

    this.user = res.result

  }

  /**
* Get all archives
*/

  public async GetArchivesByCompany(): Promise<void> {

    var companyId = localStorage.getItem('companyId');

    let res = await this._archivesService.GetArchivesByCompany(Number(companyId));

    if (res.success) {
      this.archivesList = res.result;      
    }
  }


  /**
 * Get  company
 */
  public async GetCompanyById(): Promise<void> {

    var companyId = localStorage.getItem('companyId');

    let res = await this._compinieService.GetCompanyById(Number(companyId));

    if (res.success) {
      this.companyDetail = res.result;
    }
  }



  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }

  onClickDownloadPdf(archive: any) {
    let base64String = archive.base64;
    this.downloadPdf(base64String, archive.name);
  }

  async onSubmit(): Promise<void> {
    let SendEmail: SendEmail = {
      ...this.rejectCompanyForm.value
    };

    let SendEmailGeneral: SendEmailGeneral = {
      ...this.rejectCompanyForm.value
    };

    const decodeToken = this._jwtService.DecodeToken(localStorage.getItem('token'));

    var rol = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (rol == "Compensaciones") {
      SendEmail.subject = "Validacion por Asistente Compensaciones"

      if (this.companyDetail.state == 1) {
        let companyUpdate: companyUpdate = {
          address: this.companyDetail.address,
          city: this.companyDetail.city,
          nit: this.companyDetail.nit,
          userId: this.companyDetail.userId,
          id: this.companyDetail.id,
          state: 1,
          nameCompany: this.companyDetail.nameCompany
        };

        var res = await this._compinieService.UpdateCompany(companyUpdate);
        await this._compinieService.SendEmail(SendEmail.to, SendEmail.subject, SendEmail.emailBody)

        if (res.success) {
          await Swal.fire(
            'Exito',
            'Rechazado con observación se finaliza el proceso rechazado para subsanación se devuelve a la etapa anterior',
            'success'
          )

          this._router.navigate(['/announcements']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ocurrido un error'
          })
        }

      }
    }

    if(this.companyDetail.state == 0){//Rechazo inicial por validación de archivos      
      SendEmailGeneral.subject = "Rechazo registro plataforma Omegan"
      SendEmailGeneral.title = "RECHAZO REGISTRO"
      var response = await this._compinieService.SendEmailGeneral(SendEmailGeneral.to, SendEmailGeneral.subject, SendEmailGeneral.title, SendEmailGeneral.emailBody)
      var responseDelete = await this._compinieService.DeleteCompany(Number(localStorage.getItem('companyId')))
    }else if (this.companyDetail.state == 1){//Rechazo por convenio      
      SendEmailGeneral.subject = "Rechazo convenio Omegan"
      SendEmailGeneral.title = "RECHAZO CONVENIO"
      var response = await this._compinieService.SendEmailGeneral(SendEmailGeneral.to, SendEmailGeneral.subject, SendEmailGeneral.title, SendEmailGeneral.emailBody)
      var responseDelete = await this._compinieService.DeleteArchiveConvenio(Number(localStorage.getItem('companyId')))
    }

    if (responseDelete.success) {
      await Swal.fire(
        'Exito',
        'Se rechazo la empresa correctamente',
        'success'
      )
      await this._router.navigate(['/companies']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: responseDelete.message
      })
    }
  }

  async UpdateCompany() {

    if (this.companyDetail.state == 1) {
      let companyUpdate: companyUpdate = {
        address: this.companyDetail.address,
        city: this.companyDetail.city,
        nit: this.companyDetail.nit,
        userId: this.companyDetail.userId,
        id: this.companyDetail.id,
        state: 2,
        nameCompany: this.companyDetail.nameCompany
      };

      var res = await this._compinieService.UpdateCompany(companyUpdate);

      var result = await this._compinieService.SendEmailGeneral(this.user.email, "Aprobación publicación de anuncio", "Aprobación", "Se aprueba la empresa para la publicación de anuncio.");

      if (res.success) {
        await Swal.fire(
          'Exito',
          'Se realizó correctamente la aprobación del convenio',
          'success'
        )

        this._router.navigate(['/announcements']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A ocurrido un error'
        })
      }


    } else if (this.companyDetail.state == 2) {
      let companyUpdate: companyUpdate = {
        address: this.companyDetail.address,
        city: this.companyDetail.city,
        nit: this.companyDetail.nit,
        userId: this.companyDetail.userId,
        id: this.companyDetail.id,
        state: 3,
        nameCompany: this.companyDetail.nameCompany
      };

      var result = await this._compinieService.UpdateCompany(companyUpdate);

      await this._compinieService.SendEmail(this.user.email, "Aprobacion", "Los soportes de exportación han sido aprobados.");

      if (result.success) {
        await Swal.fire(
          'Exito',
          'Los soportes de exportación han sido aprobados',
          'success'
        )
        this._router.navigate(['/announcements']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A ocurrido un error'
        })
      }
    }
    else {
      let companyUpdate: companyUpdate = {
        address: this.companyDetail.address,
        city: this.companyDetail.city,
        nit: this.companyDetail.nit,
        userId: this.companyDetail.userId,
        id: this.companyDetail.id,
        state: 1,
        nameCompany: this.companyDetail.nameCompany
      };

      var result = await this._compinieService.UpdateCompany(companyUpdate);


      let resetPassword: resetPassword = {
        email: this.user.email
      };


      await this._registerService.ResetPassword(resetPassword);

      if (result.success) {
        await Swal.fire(
          'Exito',
          'Se realizó la aprobación de la empresa correctamente',
          'success'
        )
        this._router.navigate(['/announcements']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A ocurrido un error'
        })
      }
    }

  }

}
