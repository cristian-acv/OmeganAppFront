import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies/companies.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Country } from '../../models';
import { Liq, LiqHistoryList } from '../../models/compensation2';




@Component({
  selector: 'app-liquidation-history',
  templateUrl: './liquidation-history.component.html',
  styleUrls: ['./liquidation-history.component.scss']
})
export class LiquidationHistoryComponent implements OnInit {
  public productList: Liq[] = [];
  public countryList: Country[] = [];
  public preLiqList : any;


  constructor(private fb: FormBuilder,
    private _companiesService: CompaniesService) { }

  ngOnInit(): void {
    this.GetCountries();
  }

  public async GetCountries(): Promise<void> {

    let response = await this._companiesService.GetAllCountry();

    if (response.success) {
      this.countryList = response.result;
    }
  }

  public GetContryId(id:number) : string{
    let destinationCountry = this.countryList.filter(element => element.id = id)
    return destinationCountry[0].nameCountry;
  }
  

  LiquidationHistoryForm = this.fb.group({
    inicialFecha: [, Validators.required],
    finalFecha: [, Validators.required]
  });


  async onSubmit() {

    const inicialFechaControl = this.LiquidationHistoryForm.get('inicialFecha');
    const finalFechaControl = this.LiquidationHistoryForm.get('finalFecha');


    const inicialFechaValue = inicialFechaControl.value;
    const finalFechaValue = finalFechaControl.value;


    const inicialFecha = new Date(inicialFechaValue);
    const finalFecha = new Date(finalFechaValue);


    const formattedIncialFecha = inicialFecha.toISOString();
    const formattedFinalFecha = finalFecha.toISOString();

    let res = await this._companiesService.GetLiquidationHistory(formattedIncialFecha, formattedFinalFecha);


    console.log(res.result);

    if (res.success && res.result != null) {
  

      // Assuming you have the data in a variable called `res`
      this.preLiqList = {
        datos: [].concat(...res.result.map((item) => {
          const parsedJsonDate = JSON.parse(item.jsonDate);
          return parsedJsonDate.map((item2) => {
            const preLiq = {
              id: item2.Id,
              exporterDate: item2.ExporterDate,
              filingDate: item2.FilingDate,
              liquidationDate: item2.Liquidation,
              agreement: item2.Agreement,
              compensatedProduct: item2.CompensatedProduct,
              announcementNumber: item2.AnnouncementNumber,
              announcementDate: item2.AnnouncementDate,
              idDestinationCountry: item2.IdDestinationCountry,
              destinationCountry: item2.DestinationCountry,
              exporter: item2.Exporter,
              state: item2.State,
              companyId: item2.CompanyId,
              trm: item2.Trm,
              productCompensated: item2.ProductCompensated,
              monthCompensate: item2.MonthCompensate,
              tariffItem: item2.TariffItem,
              description: item2.Description,
              kilogramsExported: item2.KilogramsExported,
              offsetKilogram: item2.OffsetKilogram,
              offsetValueKilogram: item2.OffsetValueKilogram,
              compensationValue: item2.CompensationValue
            };
            return preLiq;
          });
        })),
      };
      

      
      await Swal.fire(
        'Exito',
        'Se realizo la consulta correctamente',
        'success'
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error Registro',
        text: res.message
      })
    }


   

  }
}
