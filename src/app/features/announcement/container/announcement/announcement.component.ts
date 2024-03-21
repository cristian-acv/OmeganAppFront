import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Announcement, AnnouncementDos, Product } from '../../models';
import { ProductService } from '../../services/product/product.service';
declare var $: any;
import 'jquery-nice-select';
import { AnnouncementService } from '../../services/announcement/announcement.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Country } from 'src/app/features/management/models';
import { CompaniesService } from 'src/app/features/management/services/companies/companies.service';
import { ArchiveOne } from 'src/app/features/auth/models';
import { getBase64EncodedFileData } from 'src/app/core/utils/encodearchive';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  selectedOption: any;
  currentDate: Date = new Date();
  minDate: Date;
  maxDate: Date;
  minDateFormat: string = '';
  maxDateFormat: string = '';
  submitted = false;
  public productList: Product[] = []
  public countryList: Country[] = [];
  aux: number = 0;
  auxProduct: number = 0;
  addProd : boolean = false;


  constructor(private fb: FormBuilder,
    private _ProductService: ProductService,
    private _announcementService: AnnouncementService,
    private _companyService: CompaniesService,
    private _router: Router) { }

  announcementForm = this.fb.group(
    {
      portshipment: ['', Validators.required],
      idDestinationCountry: [0, Validators.required],
      shippingdate: ['', Validators.required],
      observation: ['', Validators.required],
      productsAnnouncement: this.fb.array([])
    }
  );


  async ngOnInit(): Promise<void> {

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    this.minDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.maxDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 2, 0);

    // aplicar formato
    //this.minDateFormat = this.minDate.toLocaleDateString("es-ES",{year: "numeric", month: "2-digit", day: "2-digit"});
    this.minDateFormat = this.minDate.toISOString().substring(0, 10);
    this.maxDateFormat = this.maxDate.toISOString().substring(0, 10);

    await this.GetProducts()
    await this.GetCountries();

    for (var i = 0; i < this.countryList.length; i++) {
      $('#my-select').append($('<option>',
        {
          value: this.countryList[i].id,
          text: this.countryList[i].nameCountry
        }));
    }
  }



  async onSubmit(): Promise<void> {

    this.submitted = this.addProd;


    if(this.addProd == true &&this.announcementForm.invalid){
      this.announcementForm.patchValue({
        idDestinationCountry :  this.productList[0].id
        });
      this.announcementForm.controls['idDestinationCountry'].updateValueAndValidity({onlySelf: true, emitEvent: false});
    }

    if (this.announcementForm.invalid && this.addProd == false) {
  
      for (var i = 0; i < this.productList.length; i++) {
        $('#' + this.aux.toString()).append($('<option>',
          {
            value: this.productList[i].id,
            text: this.productList[i].tariffItem
          }));
      }

      this.announcementForm.controls.productsAnnouncement.controls[this.aux].patchValue(
        {    tariffitem : 1,
             productId: 1,
          description: this.productList[0].description,
        }
      );
      this.aux = this.aux + 1;      
      return;
    }else if(this.announcementForm.invalid){      
      return;
    } else {
      let requestLogin: AnnouncementDos = {
        ...this.announcementForm.value
      };
      requestLogin.state = 2;  

      var result = this.countryList.find( cuidad => cuidad.id == requestLogin.idDestinationCountry)

      if(!result){
        requestLogin.idDestinationCountry = this.countryList[0].id;
      }
           
      await this.registerAnnouncement(requestLogin)
    }
  }

  public async registerAnnouncement(request: AnnouncementDos) {

    if(request.idDestinationCountry == 0){
      request.idDestinationCountry = 1;
    }

    request.state = 2;

    request.companyid = Number(localStorage.getItem('companyId'));

    var response = await this._announcementService.RegisterAnnouncement(request)

    var responseEmail = await this._companyService.SendEmailGeneral(localStorage.getItem('NombreCorreo'), "Creación anuncio", "CREACIÓN EXITOSA DE ANUNCIO", "Recuerda que posterior a la fecha de exportación se cuenta con 3 días hábiles para subir los archivos de Factura, DEX y BL.")

    if (response.success) {
      await Swal.fire(
        'Exito',
        'Se realizó la creación del anuncio correctamente',
        'success'
      )
      await this._router.navigate(['/announcements']);
      await this.onReset()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.message
      })
    }
  }



  // Getter method to access formcontrols
  get f(): { [key: string]: AbstractControl } {
    return this.announcementForm.controls;
  }


  get products() {
    return this.announcementForm.controls["productsAnnouncement"] as FormArray;
  }


  async addProduct() {

    const producForm = this.fb.group({
    productId: ['', Validators.required],
    tariffitem: ['', Validators.required],
    description: ['', Validators.required],
    kilogram: ['', Validators.required]
    });

    this.products.push(producForm);

    this.addProd = false
  }

  dos(){
    this.addProd = true;
  }


  deleteProducts(lessonIndex: number) {
    this.products.removeAt(lessonIndex);
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
* Get all type products
*/

  public async GetCountries(): Promise<void> {

    let response = await this._companyService.GetAllCountry();

    if (response.success) {
      this.countryList = response.result;
    }



  }


  onReset(): void {
    this.submitted = false;
    this.announcementForm.reset();
  }

  async onChange(id : number ,idProduc: number) {    
    
    var descr;
    this.productList.forEach(product => {
      if(product.id == idProduc){
        descr = product.description;
      }
    });

    this.announcementForm.controls.productsAnnouncement.controls[id].patchValue(
      {        
        productId: idProduc,        
        description: descr
      }
    );
    this.auxProduct = this.auxProduct + 1;

  }

  // Getter method to access formcontrols
  get myForm() {
    return this.announcementForm.controls;
  }

  eliminarItem(id: number) {
    this.products.removeAt(id);

    this.aux --;
  }
}


