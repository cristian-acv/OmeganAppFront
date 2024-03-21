import { Component, OnInit } from '@angular/core';
import { OrderPre, preAprovado } from '../../models';
import { CompaniesService } from '../../services/companies/companies.service';
import { ExcelService } from '../../services/excel/excel.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-approved',
  templateUrl: './pre-approved.component.html',
  styleUrls: ['./pre-approved.component.scss']
})
export class PreApprovedComponent implements OnInit {
  public preAprovadoList: preAprovado;
  public orderList: OrderPre[] = [];
  constructor(private _companiesService: CompaniesService,
    private _excelService: ExcelService,
    private _router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.GetPreaprobado();
  }

  async GetPreaprobado(): Promise<void> {
    let res = await this._companiesService.GetPreaprobado(false)

    if (res.success) {
      this.preAprovadoList = res.result;
    }

    for (let i = 0; i < this.preAprovadoList.lstPreapproved.length; i++) {

         let myOrder: OrderPre = {}


        myOrder.company = this.preAprovadoList.lstPreapproved[i].company;
        myOrder.compesation = this.preAprovadoList.lstPreapproved[i].amount;

        if(this.preAprovadoList.lstRound1 != null){
          myOrder.oneRound = this.preAprovadoList.lstRound1[i].amount;
        }
        
        if(this.preAprovadoList.lstRound2 != null){
          myOrder.twoRound = this.preAprovadoList.lstRound2[i].amount;
        }

        if(this.preAprovadoList.lstFinal != null){
          myOrder.final = this.preAprovadoList.lstFinal[i].amount
        }

        if(this.preAprovadoList.lstFinal[i].percent != null){
          myOrder.percent = this.preAprovadoList.lstFinal[i].percent
        }

        this.orderList.push(myOrder);

    }

  }

  async aprobarPreavado() : Promise<void> {
    let response = await this._companiesService.GetPreaprobado(true)

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

  generateExcel() {

    let arrayOfArrays: any[][] = [];

    let newArray = this.orderList.map(item => [item.company, item.compesation, item.oneRound, item.twoRound, item.final])

    arrayOfArrays = newArray

     this._excelService.generateExcel(arrayOfArrays);
   }


  async preaprovadoHistory(){
    await this._router.navigate(['/pre-approved-history']);
  }
   
}
