import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies/companies.service';
import Swal from 'sweetalert2';
import { OrderPre, OrderPreList2, preAprovado, preAprovado2, preAprovadoList } from '../../models';
import { FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'app-pre-approved-history',
  templateUrl: './pre-approved-history.component.html',
  styleUrls: ['./pre-approved-history.component.scss']
})
export class PreApprovedHistoryComponent implements OnInit {

  public preAprovados: preAprovadoList[] = [];
  public orderList2: OrderPreList2[] = [];

  public myArray: any[] = [];

  constructor(private fb: FormBuilder,
    private _companiesService: CompaniesService) { }

  
  preApprovedHistoryForm = this.fb.group({
    inicialFecha: [, Validators.required],
    finalFecha: [, Validators.required]
  });


  async ngOnInit(): Promise<void> {

  }

  async onSubmit(){

    const inicialFechaControl = this.preApprovedHistoryForm.get('inicialFecha');
    const finalFechaControl = this.preApprovedHistoryForm.get('finalFecha');
  

    const inicialFechaValue = inicialFechaControl.value;
    const finalFechaValue = finalFechaControl.value;
  

    const inicialFecha = new Date(inicialFechaValue);
    const finalFecha = new Date(finalFechaValue);
  

    const formattedIncialFecha = inicialFecha.toISOString();
    const formattedFinalFecha = finalFecha.toISOString();

    let res = await this._companiesService.GetPreaprobadoHistory(formattedIncialFecha, formattedFinalFecha);

    if (res.success && res.result !=null ) {
      await Swal.fire(
        'Exito',
        'Se realizo la consulta correctamente',
        'success'
      )



      var preAprovadoList: preAprovadoList = {
        datos: res.result.map((item) => {
          const parsedJsonDate = JSON.parse(item.jsonDate);
          const preAprovado: preAprovado2 = {
            lstPreapproved: parsedJsonDate.lstPreapproved,
            lstRound1: parsedJsonDate.lstRound1,
            lstRound2: parsedJsonDate.lstRound2,
            lstFinal: parsedJsonDate.lstFinal,
            totalPreaprobado: parsedJsonDate.TotalPreaprobado,
            excedente1: parsedJsonDate.Excedente1,
            excedente2: parsedJsonDate.Excedente2,
            totalRound1: parsedJsonDate.TotalRound1,
            totalRound2: parsedJsonDate.TotalRound2,
          };
          return preAprovado;
        }),
      };

      for (let i = 0; i < preAprovadoList.datos.length; i++) {

        let order: OrderPre[] = [];

        for (let j = 0; j < preAprovadoList.datos[i].lstPreapproved.length; j++) {

          let myOrder: OrderPre = {}

          myOrder.company = preAprovadoList.datos[i].lstPreapproved[j].Company.toString();
          myOrder.compesation = preAprovadoList.datos[i].lstPreapproved[j].Amount;

          if (preAprovadoList.datos[i].lstRound1 != null) {
            myOrder.oneRound = preAprovadoList.datos[i].lstRound1[j].Amount;
          }

          if (preAprovadoList.datos[i].lstRound2 != null) {
            myOrder.twoRound = preAprovadoList.datos[i].lstRound2[j].Amount;
          }

          if (preAprovadoList.datos[i].lstFinal != null) {
            myOrder.final = preAprovadoList.datos[i].lstFinal[j].Amount
          }

          if (preAprovadoList.datos[i].lstFinal[j].Percent != null) {
            myOrder.percent = preAprovadoList.datos[i].lstFinal[j].Percent
          }
            order.push(myOrder);
        }
         
        this.myArray[i] =order;
      }


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error Registro',
        text: res.message
      })
    }
  }
}


