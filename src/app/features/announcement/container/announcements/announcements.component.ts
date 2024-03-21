import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Announcement, AnnouncementDetail } from '../../models';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import Swal from 'sweetalert2';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { getBase64EncodedFileData } from 'src/app/core/utils/encodearchive';
import { Archive, ArchiveOne } from 'src/app/features/auth/models';
import { ArchivesDetailService } from 'src/app/features/management/services/archives-detail/archives-detail.service';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  public announcementList: AnnouncementDetail[] = [];
  public namecompany: string;
  public anuncioVisible: boolean = false;
  public cambioContrasenaVisible: boolean = true;
  public certificadoVisible: boolean = true;
  public anuncioFormato: boolean = true;
  
  public soportesExportacionFormato: boolean = true
  public archives: ArchiveOne[] = [];

  constructor(public fb: FormBuilder,
    private _announcementService: AnnouncementService,
    private _archivesService: ArchivesDetailService,
    private _router: Router,
    private _jwtService: JwtService,
  ) { }

  announcementForm = this.fb.group({
  });


  async ngOnInit(): Promise<void> {

    await this.GetCompany()    
    if (Boolean(localStorage.getItem('soportesExportacionFormato') != null)) {
      this.soportesExportacionFormato = Boolean(localStorage.getItem('soportesExportacionFormato'));      
    }

  }


  /**
  * Get company
  */

  public async GetCompany(): Promise<void> {

    var userid: string = localStorage.getItem('userid');
    
    const decodeToken = this._jwtService.DecodeToken(localStorage.getItem('token'));

    var rol = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];


    if (rol != "Representante Legal") {
      userid = localStorage.getItem('UsercompanyId')
    }

    let res = await this._announcementService.GetCompany(userid);

    localStorage.setItem('companyId', res.result.id.toString());
    
    if (res.success) {
      localStorage.setItem('NombreEmpresa', res.result.nameCompany);

      if (rol == "Representante Legal") {
        if (res.result.state == 1) {
            var companyId = localStorage.getItem('companyId');
            let res = await this._archivesService.GetArchivesByCompany(Number(companyId));
            
            if(res.result.length == 4)
            {
              this.anuncioFormato = false;
              await Swal.fire(
                'Importante',
                'Recuerda subir el formato de convenio de estabilización firmado en la plataforma de Omegan. Será validado por el área responsable antes de ser habilitado.'
              )

            }
            
        }

        if (res.result.state == 2) {
          this.soportesExportacionFormato = false
        }

        if (res.result.state == 1 || res.result.state == 0) {
          this.anuncioVisible = true;
        }

        if (rol == "Representante Legal"){
          this.cambioContrasenaVisible = false;
        }

        if (res.result.state == 3) {
          this.certificadoVisible = false;
          await Swal.fire(
            'Importante',
            'Recuerda subir al plataforma el certificado del revisor fiscal que confirma estar al día en el pago de la CFGL.'
          );
        }
      } else {
        this.anuncioVisible = true;
      }

      this.announcementList = res.result.announcements;
        
      this.namecompany = res.result.nameCompany

      localStorage.setItem('companyId', res.result.id.toString());
    }
  }

  onCompayDetail() {
    this._router.navigate(['/companie-detail']);
  }

  openLink() {
    window.open("https://fedegan-my.sharepoint.com/:w:/g/personal/abanquez_fedegan_org_co/EQZo-8zvnUFLgAOjof6T264BZZ94xtO4RFXOa4S1Aic-ZQ?e=ptXCMt")
  }

  onAnuncio() {
    this._router.navigate(['/create-announcement']);
  }

  async onSubmit(): Promise<void> {

  }


  public async captureFile(event): Promise<any> {

    const archivecapture = event.target.files[0] as File

    const base64 = await getBase64EncodedFileData(archivecapture)

    let archive: ArchiveOne = {
      name: archivecapture.name,
      base64: base64,
      type: archivecapture.type,
      state: true,
      companyId: Number(localStorage.getItem('companyId')),
      group : 2
    };

    var result = await this._announcementService.RegisterArchive(archive)

    if (result.success) {
      await Swal.fire(
        'Exito',
        'Se ha realizado correctamente la carga del archivo. Se notificará por correo electrónico el estado de su trámite.',
        'success'
      )

      this.anuncioFormato = true;
      this.certificadoVisible = true
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message
      })
    }
  }

  public async captureFile2(event): Promise<any> {

    const archivecapture = event.target.files[0] as File

    const base64 = await getBase64EncodedFileData(archivecapture)

    let archive2: ArchiveOne = {
      name: archivecapture.name,
      base64: base64,
      type: archivecapture.type,
      state: true,
      companyId: Number(localStorage.getItem('companyId')),
      group: 3
    };
    this.archives.push(archive2);
  }

  onClickDetalle(detalle: AnnouncementDetail) {
    localStorage.setItem('idanuncio', detalle.id.toString());
  }

  public stateAnnuncement(status:Number): string{
    if(status == 0){
     return  'Cancelado'
    }else if(status == 1){
      return 'Pendiente archivos'
    }else if(status == 2){
     return 'Activo'
    }else if(status == 3){
      return 'Aprobado'
    }else if(status == 9){
      return 'Finalizado'
    }
 }
}
