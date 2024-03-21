import { COMPILER_OPTIONS, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Announcement, AnnouncementDos, ArchivesCom, Compensation, Product } from '../../models';
import { ProductService } from '../../services/product/product.service';
declare var $: any;
import 'jquery-nice-select';
import { AnnouncementService } from '../../services/announcement/announcement.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Country, Trm } from 'src/app/features/management/models';
import { CompaniesService } from 'src/app/features/management/services/companies/companies.service';
import { CompensationService } from '../../services/compensation/compensation.service';
import { ConsolidatedCompensationComponent } from 'src/app/features/management/container/consolidated-compensation/consolidated-compensation.component';
import { getBase64EncodedFileData } from 'src/app/core/utils/encodearchive';

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.scss']
})
export class CompensationComponent implements OnInit {
  public trm: Trm[] = [];
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
  addProd: boolean = false;
  public archivesCom: ArchivesCom = {};

  constructor(private fb: FormBuilder,
    private _ProductService: ProductService,
    private _compensationService: CompensationService,
    private _companyService: CompaniesService,
    private _router: Router) { }

  announcementForm = this.fb.group(
    {
      idDestinationCountry: [0, Validators.required],
      exporterDate: [, Validators.required],
      productsCompensations: this.fb.array([]),
      signatureRepresentative: ['', Validators.required],
      signatureAuditor: ['', Validators.required]
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

    await this.GetProducts();
    await this.GetCountries();

    await this.GetAllTrm();

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

      this.announcementForm.controls.productsCompensations.controls[this.aux].patchValue(
        {
          tariffitem: 1,
          productId: 1,
          description: this.productList[0].description,
        }
      );

      this.aux = this.aux + 1;
      return;

    } else if (this.announcementForm.invalid) {
      return;
    } else {

      let requestLogin: Compensation = {
        ...this.announcementForm.value
      };

      var result = this.countryList.find( cuidad => cuidad.id == requestLogin.idDestinationCountry)

      if(!result){
        requestLogin.idDestinationCountry = this.countryList[0].id;
      }
      requestLogin.state = 2;

      await this.registerCompensation(requestLogin)
    }
  }

  public async registerCompensation(request: Compensation) {

    if(request.idDestinationCountry == 0){
      request.idDestinationCountry = 1;
    }

    request.state = 2;

    request.companyid = Number(localStorage.getItem('companyId'));

    request.announcementNumber = Number(localStorage.getItem('idanuncio'));


    request.ejecucion = false;

    const currentDate2 = new Date();

    request.filingDate = currentDate2;

    request.announcementDate = currentDate2;

    //request.idDestinationCountry++;

    request.signatureAuditor = this.archivesCom.signatureAuditorBase;

    request.signatureRepresentative = this.archivesCom.signatureRepresentativeBase;

    var response = await this._compensationService.RegisterCompensation(request)

    if (response.success) {
      await Swal.fire(
        'Exito',
        'Se realizó la creación de la compensación',
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
    return this.announcementForm.controls["productsCompensations"] as FormArray;
  }


  async addProduct() {

    const producForm = this.fb.group({
      productId: ['', Validators.required],
      tariffitem: ['', Validators.required],
      description: ['', Validators.required],
      kilogramsExported: ['', Validators.required],
      offsetKilogram: ['', Validators.required],
      valueCountry:['', Validators.required],
      subtotal: ['', Validators.required]
    });

  // Suscríbete a los cambios de "kilogramsExported" y "offsetKilogram" en este formulario
  producForm.get('kilogramsExported').valueChanges.subscribe(() => {
    this.calcularValorPais(producForm);
  });

   
  producForm.get('valueCountry').valueChanges.subscribe(() => {
    this.calcularValorPais(producForm);
  });


  producForm.get('offsetKilogram').valueChanges.subscribe(() => {
    this.calcularValorPais(producForm);
  });

    this.products.push(producForm);

    this.addProd = false
  }

  dos() {
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

  async onChange(id,idProduc: number) {

    var descr;
    this.productList.forEach(product => {
      if(product.id == idProduc){
        descr = product.description;
      }
    });

    this.announcementForm.controls.productsCompensations.controls[id].patchValue(
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

  public async captureFile(event): Promise<any> {
    const inputName = event.target.name;

    const archivecapture = event.target.files[0] as File

    const base64 = await getBase64EncodedFileData(archivecapture)
  
    if (inputName == 'signatureAuditor') {
       this.archivesCom.signatureAuditorBase = base64;
    } else {
      this.archivesCom.signatureRepresentativeBase = base64;
    }
  }

  eliminarItem(id: number) {
    this.products.removeAt(id);
    this.aux --;
  }

  async GetAllTrm() {
    let res = await this._companyService.GetTrm()

    if (res.success) {
      this.trm = res.result;
    }
  }

  // Calcula el valor del país y actualiza el campo "subtotal" en el formulario dado
// Calcula el valor del país y actualiza el campo "subtotal" en el formulario dado
calcularValorPais(form: FormGroup) {
  const kilogramos = form.get('kilogramsExported').value;
  const trm = form.get('offsetKilogram').value;
  const valueCountry =  form.get('valueCountry').value;

  if (kilogramos && trm && valueCountry) {
    const subTotal = kilogramos * trm * valueCountry;
    form.get('subtotal').setValue(subTotal);
  } else {
    // Si cualquiera de los campos no tiene valor, limpia el campo "subtotal"
    form.get('subtotal').setValue(null);
  }
}

}


