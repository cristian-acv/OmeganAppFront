import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getBase64EncodedFileData } from 'src/app/core/utils/encodearchive';
import { ArchiveTwo } from 'src/app/features/auth/models';
import { Archive, Country, userByIde } from 'src/app/features/management/models';
import { CompaniesService } from 'src/app/features/management/services/companies/companies.service';
import { AnnouncementUpdateByIdByState, Compensation, Compensation2, CompensationDetail, Product, CompensationUpdateByIdByState, CompensationUpdate } from '../../models';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import { CompensationService } from '../../services/compensation/compensation.service';
import { ProductService } from '../../services/product/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/features/auth/services/registration/registration.service';


@Component({
  selector: 'app-compensation-detail',
  templateUrl: './compensation-detail.component.html',
  styleUrls: ['./compensation-detail.component.scss']
})
export class CompensationDetailComponent implements OnInit {

  public productList: Product[] = []
  public countryList: Country[] = [];
  public archivosVisible: boolean = false;
  public archivosObligatorios: boolean = false;
  public archivosVisibleAuditoria: boolean = false;
  public sumaAcumulativa = 0; // Inicializamos la suma en 0
  public archivosVisiblePazSalvo: boolean = false;
  public archivosVisibleComprobantePago: boolean = false;
  public detalle: Compensation2 = {};
  public archives: ArchiveTwo[] = [];
  public archivesList: Archive[] = [];
  public buttonAprobarVisible: boolean = false;
  public buttonCancelarVisible: boolean = true;
  public buttonRechazarArchivosVisible: boolean = false;

  constructor(private fb: FormBuilder,
    private _ProductService: ProductService,
    private _companyService: CompaniesService,
    private _registerService: RegistrationService,
    private _compensationService: CompensationService,    
    private _announcementService: AnnouncementService,
    private _router: Router) { }
    
    
  announcementDetailForm = this.fb.group(
    {
    }
  );

  async ngOnInit(): Promise<void> {
    await this.GetProducts()
    await this.GetCountries();

    var id: string = localStorage.getItem('idanuncio');

    var res = await this._compensationService.GetCompensationsById(Number(id))

    localStorage.setItem('IdCompensation', res.result.id.toString());

    this.detalle = res.result;
    var trmObservation = this.detalle.observation.split("*");

    if(trmObservation[0].length != 0){
      this.detalle.trm = trmObservation[0];
      this.detalle.observation = trmObservation[1];
    }        

    this.detalle.productsList.forEach((producForm) => {
       this.sumaAcumulativa += producForm.subtotal;

       producForm.subTotal2 = this.sumaAcumulativa;
       console.log(producForm.subTotal2);
    });

    let destinationCountry = this.countryList.filter(element => element.id === res.result.idDestinationCountry)
    this.detalle.destinationCountry = destinationCountry[0].nameCountry;
    var resulArchivos = await this._announcementService.GetArchivesByAnnouncement(res.result.announcementNumber, 2);

    
    
    if(localStorage.getItem('NombreRol') != "Representante Legal"){
      if(res.result.state == 2 || res.result.state == 1){      
       if (resulArchivos.result.length != 0) {
         this.buttonAprobarVisible = true;
         this.buttonRechazarArchivosVisible = true;
       }
      }
    }

    if(res.result.state == 3){      
      if(localStorage.getItem('NombreRol') != "Representante Legal"){
        this.archivosVisibleAuditoria = true;
      }
    }

    if(res.result.state == 4){      
      if(localStorage.getItem('NombreRol') == "Representante Legal"){
        this.archivosVisiblePazSalvo = true;
        await Swal.fire(
          'Importante',
          'Recuerda cargar documento de paz y salvo de CFGL.'
        )
      }
    }

    if(res.result.state == 5){      
      if(localStorage.getItem('NombreRol') != "Representante Legal"){
        this.archivosVisibleComprobantePago = true;
      }
    }

    if(res.result.state > 2){
      this.buttonCancelarVisible = false;
    }

    if (resulArchivos.result.length == 0) {
      if(localStorage.getItem('NombreRol') == "Representante Legal"){
        this.archivosVisible = true;
        await Swal.fire(
          'Importante',
          'Recuerda que posterior a la fecha de exportación se cuenta con 30 días hábiles para subir los archivos de exportación.'
        )
      }      
    } else {

      this.archivesList = resulArchivos.result;

      this.archivosObligatorios = true;
    }
  }

  /**
* Get all type products
*/
  public async GetProducts(): Promise<void> {

    let response = await this._ProductService.GetProducts();

    if (response.success) {
      this.productList = response.result;
    }

  }


  /**
  * Get all Countries
  */
  public async GetCountries(): Promise<void> {

    let response = await this._companyService.GetAllCountry();

    if (response.success) {
      this.countryList = response.result;
    }
  }

  public async captureFile2(event): Promise<any> {

    const archivecapture = event.target.files[0] as File

    const base64 = await getBase64EncodedFileData(archivecapture)

    let archive2: ArchiveTwo = {
      name: archivecapture.name,
      base64: base64,
      type: archivecapture.type,
      state: true,
      announcementId: Number(localStorage.getItem('Idannouncement')),
      group: 2
    };
    this.archives.push(archive2);
  }

  public async captureFile3(event): Promise<any> {

    const archivecapture = event.target.files[0] as File

    const base64 = await getBase64EncodedFileData(archivecapture)

    let archive2: ArchiveTwo = {
      name: archivecapture.name,
      base64: base64,
      type: archivecapture.type,
      state: true,
      announcementId: Number(localStorage.getItem('Idannouncement')),
      group: 3
    };
    this.archives.push(archive2);
  }

  public async captureFile4(event): Promise<any> {

    const archivecapture = event.target.files[0] as File

    const base64 = await getBase64EncodedFileData(archivecapture)

    let archive2: ArchiveTwo = {
      name: archivecapture.name,
      base64: base64,
      type: archivecapture.type,
      state: true,
      announcementId: Number(localStorage.getItem('Idannouncement')),
      group: 4
    };
    this.archives.push(archive2);
  }

  public async captureFile5(event): Promise<any> {

    const archivecapture = event.target.files[0] as File

    const base64 = await getBase64EncodedFileData(archivecapture)

    let archive2: ArchiveTwo = {
      name: archivecapture.name,
      base64: base64,
      type: archivecapture.type,
      state: true,
      announcementId: Number(localStorage.getItem('Idannouncement')),
      group: 5
    };
    this.archives.push(archive2);
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

  onClickDownloadPdf2(archive: string, name: string) {
    this.downloadPdf(archive,name);
  }
  
  async onCaptureExportacion() {

    //Information for send email and configuration
    var res = await this._compensationService.GetCompensationsById(Number(localStorage.getItem('idanuncio')))
    let resCompany = await this._companyService.GetCompanyById(Number(res.result.companyId));
    var userByID: userByIde;
    userByID = { idUser: resCompany.result.userId };
    let resUser = await this._registerService.GetUsersById(userByID)

    //Information for update compensation with field Observation
    var resObservation = await this._compensationService.GetCompensationsById(Number(Number(localStorage.getItem('idanuncio'))));
    var trmObservation = resObservation.result.observation.split("0");

    var resul: any;
    var trueFiles: boolean = true;
    var numberFiles: number;
    
    if(res.result.state >= 3){
      numberFiles = 1;
    }else{
      numberFiles = 6
    }

    if(this.archives.length < numberFiles){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Debe ingresar todos los archivos"
      })
      return;
    }
    
    this.archives.forEach(async item => {
      resul = await this._announcementService.RegisterArchiveAnnouncement(item);
      if(!resul.success){
        trueFiles = false;
      }      
    });

    if (trueFiles) {
      await Swal.fire(
        'Exito',
        'Se ha realizado correctamente la carga de los archivos.',
        'success'
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: resul.message
      })
    }

    if(res.result.state == 3){      
      if(localStorage.getItem('NombreRol') != "Representante Legal"){        
        let updateCompensation: CompensationUpdate = {
          id: Number(localStorage.getItem('IdCompensation')),
          observation: trmObservation.toString(),
          state: 4
        };
        let response = await this._compensationService.UpdateObservationCompensationById(updateCompensation);
        var responseEmail = await this._companyService.SendEmailGeneral(resUser.result.email, "Solicitud Paz y Salvo", "PAZ Y SALVO", "Por favor cargar documento de paz y salvo de CFGL en la compensación.")
      }
    }

    if(res.result.state == 4){
      if(localStorage.getItem('NombreRol') == "Representante Legal"){        
        let updateCompensation: CompensationUpdate = {
          id: Number(localStorage.getItem('IdCompensation')),
          observation: trmObservation.toString(),
          state: 5
        };
        let response = await this._compensationService.UpdateObservationCompensationById(updateCompensation);
      }
    }

    if(res.result.state == 5){
      if(localStorage.getItem('NombreRol') != "Representante Legal"){        
        
        let updateCompensation: CompensationUpdate = {
          id: Number(localStorage.getItem('IdCompensation')),
          observation: trmObservation.toString(),
          state: 9
        };
        let response = await this._compensationService.UpdateObservationCompensationById(updateCompensation);

        const announcement: AnnouncementUpdateByIdByState = {
          id:Number(localStorage.getItem('Idannouncement')),
          state: 9,
        };
    
        var result = await this._announcementService.UpdateStateAnnouncementById(announcement)
        var responseEmail = await this._companyService.SendEmailGeneral(resUser.result.email, "Comprobante de pago", "PAGO REALIZADO", "Se ha realizado el pago por parte del FEP, consulte el comprobante en el panel de archivos de la compensación.")
      }
    }
    
    window.location.reload();
  }

  public async aprobarAnuncio() {
    const compensation: CompensationUpdateByIdByState = {
      id:Number(localStorage.getItem('IdCompensation')),
      state: 3,
    };

    var result = await this._compensationService.UpdateStateAnnouncementById(compensation)
    
    if (result.success) {
      await Swal.fire(
        'Exito',
        'Se ha realizado correctamente la aprobación de la compensación',
        'success'
      )
      window.location.reload();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message
      })
    }
  }

  public onClickDelete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '¡No!',
      confirmButtonText: '¡Sí!'
    }).then(async (result) => {      
      if (result.isConfirmed) {
        // Mostramos la alerta y solicitamos al usuario que ingrese cuatro valores
        const { value: formValues } = await Swal.fire({
          title: 'Por favor justificar la cancelación de la compensación',
          html:
            '<input id="swal-input1" class="swal2-input" placeholder="Descripcion">',
          focusConfirm: false,
          preConfirm: () => {
            return [
              (document.getElementById('swal-input1') as HTMLInputElement).value
            ]
          }
        });

        let responseDeleteArchives = await this._companyService.DeleteArchiveAnnouncement(Number(localStorage.getItem('idanuncio')), 2);
        let response = await this._compensationService.DeleteCompensation(Number(localStorage.getItem('IdCompensation')));

        if (response.success) {
          this._router.navigate(['/announcements']);
        }
      }
    });
  }

  public onClickRechazarArchivos(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Se solicitarán nuevamente los archivos de compensación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '¡No!',
      confirmButtonText: '¡Sí!'
    }).then(async (result) => {      
      if (result.isConfirmed) {        
        const { value: formValues } = await Swal.fire({
          title: 'Por favor justificar el rechazo de los archivos',
          html:
            '<input id="swal-input3" class="swal2-input" placeholder="Justificación">',
          focusConfirm: false,
          preConfirm: () => {
            return [
              (document.getElementById('swal-input3') as HTMLInputElement).value
            ]
          }
        });

        if (formValues) {

          var resObservation = await this._compensationService.GetCompensationsById(Number(Number(localStorage.getItem('idanuncio'))));
          var trmObservation = resObservation.result.observation.split("*");          

          let updateCompensation: CompensationUpdate = {
            id: Number(localStorage.getItem('IdCompensation')),
            observation: trmObservation[0] +  '*Motivo rechazo de archivos: ' + (document.getElementById('swal-input3') as HTMLInputElement).value,
            state: 1            
          };
          
          var res = await this._compensationService.GetCompensationsById(Number(localStorage.getItem('idanuncio')))
          let resCompany = await this._companyService.GetCompanyById(Number(res.result.companyId));
          var userByID: userByIde;
          userByID = { idUser: resCompany.result.userId };
          let resUser = await this._registerService.GetUsersById(userByID)
          let responseDeleteArchives = await this._companyService.DeleteArchiveAnnouncement(Number(localStorage.getItem('idanuncio')), 2);
          let responseEmail = await this._companyService.SendEmailGeneral(resUser.result.email, "Rechazo archivos de compensación", "CARGAR ARCHIVOS DE COMPENSACIÓN", "Por favor cargar los archivos en la compensación ya que fueron rechazados por el siguiente motivo: ." + (document.getElementById('swal-input3') as HTMLInputElement).value);
          let response = await this._compensationService.UpdateObservationCompensationById(updateCompensation);
          if (response.success) {
            this._router.navigate(['/announcements']);
          }
        }
      }
    });
  }


 

  // Función para calcular la suma acumulativa
  calcularSumaAcumulativa(subTotal : any) {
   return this.sumaAcumulativa += subTotal;
  }

}
