import { Component, OnInit } from '@angular/core';
import { Country, preAprovado } from '../../models';
import { Liq, ResponsePreLiq } from '../../models/compensation2';
import { CompaniesService } from '../../services/companies/companies.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel/excel.service';

@Component({
  selector: 'app-liquidation',
  templateUrl: './liquidation.component.html',
  styleUrls: ['./liquidation.component.scss']
})
export class LiquidationComponent implements OnInit {
  public productList: Liq[] = [];
  public countryList: Country[] = [];
  

  constructor( private _companiesService: CompaniesService,
    private _companyService: CompaniesService,
    private _excelService: ExcelService,
    private _router: Router) { }
    

  ngOnInit(): void {
    this.GetCompensation();
    this.GetCountries();
  }

  public async GetCompensation(): Promise<void> {

    let response = await this._companiesService.GetCompensation(false);

    if (response.success) {
      this.productList = response.result;
    }

    console.log(response.result);
  }

    /**
* Get all type products
*/

public async GetCountries(): Promise<void> {

  let response = await this._companyService.GetAllCountry();

  if (response.success) {
    this.countryList = response.result;
  }
  console.log(response);
}

public GetContryId(id:number) : string{
  let destinationCountry = this.countryList.filter(element => element.id = id)
  return destinationCountry[0].nameCountry;
}



async aprobarLiquidacion() : Promise<void> {
  let response = await this._companiesService.GetCompensation(true)

  if (response.success) {
    await Swal.fire(
      'Exito',
      'Se realizó el registro correctamente le estaremos informando sobre su trámite vía correo electrónico',
      'success'
    )
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error Registro',
      text: response.message
    })
  }

}


async LiquidationHistory(){
  await this._router.navigate(['/liquidation-history']);
}


generateExcel() {

  let arrayOfArrays: any[][] = [];

  for (let i = 0; i < this.productList.length; i++) {
    const country = this.countryList.find((country) => country.nameCountry === this.productList[i].destinationCountry);

    this.productList[i].currentValue = country.currentValue;
 }  

  
 let newArray = this.productList.map(item => [item.id , item.announcementNumber, item.filingDate, item.liquidationDate, item.liquidationDate,
  item.exporter, item.agreement, item.productCompensated, item.tariffItem, item.exporterDate, item.destinationCountry,
item.monthCompensate, item.kilogramsExported, item.currentValue, item.trm, item.offsetValueKilogram, item.compensationValue])

  arrayOfArrays = newArray

   this._excelService.generateExcelLiquidation(arrayOfArrays);
 }


}


