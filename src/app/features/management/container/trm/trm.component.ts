import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Trm } from '../../models';
import { CompaniesService } from '../../services/companies/companies.service';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html',
  styleUrls: ['./trm.component.scss']
})
export class TrmComponent implements OnInit {

  public trm: Trm[] = [];

  constructor(private _companiesService: CompaniesService) { }

  async ngOnInit(): Promise<void> {
    await this.GetAllTrm();
  }

  async GetAllTrm() {
    let res = await this._companiesService.GetTrm()

    if (res.success) {
      this.trm = res.result;
    }
  }


  async onClickUpdate(trm : Trm) {
    // Mostramos la alerta y solicitamos al usuario que ingrese cuatro valores
    const { value: formValues } = await Swal.fire({
      title: 'Ingresa la Informacíon requerida',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="TRM">' +
        '<input id="swal-input2" class="swal2-input" placeholder="PRESUPUESTO MES">'+
        '<input id="swal-input3" class="swal2-input" placeholder="No. EMPRESA INICIAL">' +
        '<input id="swal-input4" class="swal2-input" placeholder="DIVISION INICIAL">' ,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      preConfirm: () => {
        if((document.getElementById('swal-input1') as HTMLInputElement).value 
            && (document.getElementById('swal-input2') as HTMLInputElement).value 
            && (document.getElementById('swal-input3') as HTMLInputElement).value
            && (document.getElementById('swal-input4') as HTMLInputElement).value){
              
              return [
                (document.getElementById('swal-input1') as HTMLInputElement).value,
                (document.getElementById('swal-input2') as HTMLInputElement).value,
                (document.getElementById('swal-input3') as HTMLInputElement).value,
                (document.getElementById('swal-input4') as HTMLInputElement).value
              ]
        }else{
          Swal.showValidationMessage('Por favor llenar todos los campos')
        }
      }
    });

    // Si el usuario hizo clic en el botón "Confirmar" y proporcionó valores, mostramos una alerta con esos valores
    if (formValues) {

      let trmU: Trm = {
        id : trm.id,
        trmValue: Number(formValues[0]),
        monthlyBudget: Number(formValues[1]),
        numberCompanies: Number(formValues[2]),
        initialDivision: Number(formValues[3])
      };

      let res = await this._companiesService.UpdateTrm(trmU)

      if (res.success) {
        Swal.fire(
          'Actulización',
          'Se actulizo correctamente la TRM',
          'success'
        )

       await this.ngOnInit()
      }

    }

  }

}
