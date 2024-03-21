import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Archive, Country } from 'src/app/features/management/models';
import { CompaniesService } from 'src/app/features/management/services/companies/companies.service';
import { Announcement, AnnouncementUpdate, AnnouncementUpdateByIdByState, Product } from '../../models';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import { ProductService } from '../../services/product/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ArchiveTwo } from 'src/app/features/auth/models';
import { getBase64EncodedFileData } from 'src/app/core/utils/encodearchive';
import { CompensationService } from '../../services/compensation/compensation.service';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.scss']
})
export class AnnouncementDetailComponent implements OnInit {
  public productList: Product[] = []
  public countryList: Country[] = [];
  public detalle: Announcement = {};
  public archives: ArchiveTwo[] = [];
  public archivosExportacion: boolean = false;
  public archivosObligatorios: boolean = false;
  public buttonGenerarVisible: boolean = false;
  public buttonAprobarVisible: boolean = false;
  public buttonCancelarVisible: boolean = true;
  public buttonConsultarVisible: boolean = false;
  public buttonRechazarArchivosVisible: boolean = false;
  public archivesList: Archive[] = [];

  constructor(private fb: FormBuilder,
    private _announcementService: AnnouncementService,
    private _ProductService: ProductService,
    private _companyService: CompaniesService,
    private _compensationService: CompensationService,
    private _router: Router) { }

  announcementDetailForm = this.fb.group(
    {
    }
  );

  async ngOnInit(): Promise<void> {
    await this.GetProducts()
    await this.GetCountries();

    var id: string = localStorage.getItem('idanuncio');

    var result = await this._announcementService.GetAnnouncementsById(Number(id))
    var resulArchivos = await this._announcementService.GetArchivesByAnnouncement(result.result.id, 1);

    var createdDate = new Date(result.result.createdDate).getMonth();
    var currentDate = new Date().getMonth();

    if(localStorage.getItem('NombreRol') != "Representante Legal"){      
       if(result.result.state == 2|| result.result.state == 1){        
        if (resulArchivos.result.length != 0) {
          this.buttonRechazarArchivosVisible = true;
          this.buttonAprobarVisible = true;
        }        
      }
    }
    
    var compensation = await this._compensationService.GetCompensationsById(Number(id))    

    if(result.result.state == 0 || result.result.state >= 3){
      this.buttonCancelarVisible = false;
    }

    this.buttonConsultarVisible = false;
    this.buttonGenerarVisible = false;

    if (result.result.state == 3 ) {      
      //if (createdDate < currentDate) {
        if (localStorage.getItem('NombreRol') == "Representante Legal") {
          if(!compensation.success){            
            this.buttonGenerarVisible = true;
          }
         }
        if(compensation.success){
          this.buttonConsultarVisible = true;
        }        
     // }
    }

    if (result.result.state == 9 ) {  
      this.buttonConsultarVisible = true;
    }

    this.detalle = result.result;

    if (resulArchivos.result.length == 0) {
      if (localStorage.getItem('NombreRol') == "Representante Legal") {
        if (result.result.state == 2){
          this.archivosExportacion = true;

          await Swal.fire(
            'Importante',
            'Recuerda que posterior a la fecha de exportación se cuenta con 3 días hábiles para subir los archivos de Factura, DEX y BL.'
          )
        }
        if(result.result.state == 1){
          this.archivosExportacion = true;

          await Swal.fire(
            'Importante',
            'Los archivos fueron rechazados, por favor cargar los archivos correctos. Ver en observaciones el motivo de rechazo.'
          )
        }
      }
    } else {

      this.archivesList = resulArchivos.result;

      this.archivosObligatorios = true;
    }

    localStorage.setItem('Idannouncement', result.result.id.toString());

    let destinationCountry = this.countryList.filter(element => element.id === result.result.idDestinationCountry)
    this.detalle.destinationCountry = destinationCountry[0].nameCountry;
   
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



  public async aprobarAnuncio() {
    const announcement: AnnouncementUpdateByIdByState = {
      id:Number(localStorage.getItem('Idannouncement')),
      state: 3,
    };

    var result = await this._announcementService.UpdateStateAnnouncementById(announcement)

    if (result.success) {
      await Swal.fire(
        'Exito',
        'Se ha realizado correctamente la aprobación del anuncio',
        'success'
      )
      //this._router.navigate([this._router.url]);
      window.location.reload();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message
      })
    }

  }

  /**
* Get all type products
*/

  public async GetCountries(): Promise<void> {

    let response = await this._companyService.GetAllCountry();

    if (response.success) {
      this.countryList = response.result;
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Mostramos la alerta y solicitamos al usuario que ingrese cuatro valores
        const { value: formValues } = await Swal.fire({
          title: 'Por favor justificar la cancelación del anuncio',
          html:
            '<input id="swal-input1" class="swal2-input" placeholder="Descripcion">',
          focusConfirm: false,
          preConfirm: () => {
            return [
              (document.getElementById('swal-input1') as HTMLInputElement).value
            ]
          }
        });

        if (formValues) {
          let updateAnuncio: AnnouncementUpdate = {            
            id: Number(localStorage.getItem('idanuncio')),
            portShipment: this.detalle.portShipment,
            destinationCountry: this.detalle.destinationCountry,
            shippingDate: this.detalle.shippingDate,
            observation: 'Motivo cancelación: ' + (document.getElementById('swal-input1') as HTMLInputElement).value,
            state: 0,
            companyid: Number(localStorage.getItem('companyId'))
          };

          let response = await this._announcementService.UpdateAnnouncement(updateAnuncio);

          if (response.success) {
            this._router.navigate(['/announcements']);
          }
        }
      }
    });
  }

  public onClickRechazarArchivos(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Se solicitarán nuevamente los archivos a la empresa!",
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
          let updateAnuncio: AnnouncementUpdate = {            
            id: Number(localStorage.getItem('idanuncio')),
            portShipment: this.detalle.portShipment,
            destinationCountry: this.detalle.destinationCountry,
            shippingDate: this.detalle.shippingDate,
            observation: 'Motivo rechazo de archivos: ' + (document.getElementById('swal-input3') as HTMLInputElement).value,
            state: 1,
            companyid: Number(localStorage.getItem('companyId'))
          };

          let response = await this._announcementService.UpdateAnnouncement(updateAnuncio);
          let responseDeleteArchives = await this._companyService.DeleteArchiveAnnouncement(Number(localStorage.getItem('idanuncio')), 1);
          let responseEmail = await this._companyService.SendEmailGeneral(localStorage.getItem('NombreCorreo'), "Rechazo archivos de anuncio", "CARGAR NUEVAMENTE ARCHIVOS DE ANUNCIO", "Por favor cargar los archivos en el anuncio ya que fueron rechazados por el siguiente motivo: ." + (document.getElementById('swal-input3') as HTMLInputElement).value);

          if (response.success) {            
            this._router.navigate(['/announcements']);
          }
        }
      }
    });
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

  public async captureFile2(event): Promise<any> {

    const archivecapture = event.target.files[0] as File

    const base64 = await getBase64EncodedFileData(archivecapture)

    let archive2: ArchiveTwo = {
      name: archivecapture.name,
      base64: base64,
      type: archivecapture.type,
      state: true,
      announcementId: Number(localStorage.getItem('Idannouncement')),
      group: 1
    };
    this.archives.push(archive2);
  }


  async onCaptureExportacion() {

    var resul: any;
    var trueFiles: boolean = true;

    if (this.archives.length != 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Debe ingresar todos los archivos"
      })
      return;
    }

    this.archives.forEach(async item => {
      resul = await this._announcementService.RegisterArchiveAnnouncement(item);
      if (!resul.success) {
        trueFiles = false;
      }
    });

    if (trueFiles) {
      await Swal.fire(
        'Exito',
        'Se ha realizado correctamente la carga de los archivos de exportación. Te notificaremos por correo electrónico sobre el estado de tu trámite.',
        'success'
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: resul.message
      })
    }

    //this._router.navigate([this._router.url]);
     // Utiliza window.location.reload() para recargar la página actual
    window.location.reload();
  }
}
