import { Component, OnInit } from '@angular/core';
import { Country } from '../../models';
import { CompaniesService } from '../../services/companies/companies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public citiesList: Country[] = [];


  constructor(private _companiesService: CompaniesService) { }

  async ngOnInit(): Promise<void> {
    await this.GetAllCountry();
  }

  async GetAllCountry(): Promise<void> {
    let res = await this._companiesService.GetAllCountry()

    if (res.success) {
      this.citiesList = res.result;
    }
  }

  async onClickDelete(country: Country) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, elimínalo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this._companiesService.DeleteCountry(country.id)
        Swal.fire(
          'Eliminar!',
          'El país ha sido eliminado.',
          'success'
        );
        this.ngOnInit();
      }
    })
  }

  async onClickUpdate(country: Country) {
    Swal.fire({
      title: 'Ingrese el nuevo valor',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      showLoaderOnConfirm: true,
      preConfirm: async (valor) => {        
        country.currentValue = valor
        if (country.currentValue){
          let res = await this._companiesService.UpdateCountry(country)
          if (res.success) {
            Swal.fire(
              'Se Actualizó!',
              'El valor se actualizó correctamente',
              'success'
            );
            this.ngOnInit();
          }
        }else{
          Swal.showValidationMessage('Por favor asignar un valor')
        }          
      }
    })
  }

  async onClickAdd() {
    // Mostramos la alerta y solicitamos al usuario que ingrese cuatro valores
    const { value: formValues } = await Swal.fire({
      title: 'Ingresa la Informacíon requerida',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre del País">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Valor del País">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      preConfirm: () => {
        if ((document.getElementById('swal-input1') as HTMLInputElement).value && (document.getElementById('swal-input2') as HTMLInputElement).value){
          return [
            (document.getElementById('swal-input1') as HTMLInputElement).value,
            (document.getElementById('swal-input2') as HTMLInputElement).value
          ]
        }else{
          Swal.showValidationMessage('Por favor llenar todos los campos')
        }
        
      }
    });

    // Si el usuario hizo clic en el botón "Confirmar" y proporcionó valores, mostramos una alerta con esos valores
    if (formValues) {

      let country: Country = {
        nameCountry: formValues[0],
        currentValue: Number(formValues[1]),
        state: true
      };

      let res = await this._companiesService.AddCountry(country)

      if (res.success) {
        Swal.fire(
          'Ingreso',
          'Se ingresó el nuevo país correctamente',
          'success'
        )
      }

      this.ngOnInit();

    }

  }

}
