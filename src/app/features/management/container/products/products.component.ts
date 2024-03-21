import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/features/announcement/models';
import { ProductService } from 'src/app/features/announcement/services/product/product.service';
import Swal from 'sweetalert2';
import { Country } from '../../models';
import { CompaniesService } from '../../services/companies/companies.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public citiesList: Country[] = [];
  public productList: Product[] = [];


  constructor(private _companiesService: CompaniesService,
    private _productService: ProductService) { }

  async ngOnInit(): Promise<void> {
    await this.GetAllCountry();
    await this.GetProducts();
  }

  async GetAllCountry(): Promise<void> {
    let res = await this._companiesService.GetAllCountry()

    if (res.success) {
      this.citiesList = res.result;
    }
  }

  async onClickDelete(product: Product) {    
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
        await this._productService.DeleteProduct(product.id)
        Swal.fire(
          'Eliminar!',
          'El producto ha sido eliminado.',
          'success'
        )
        this.ngOnInit()
      }
    })

  }

    /**
 * Get all type products
 */
  public async GetProducts(): Promise<void> {

    let response = await this._productService.GetProducts();

    if (response.success) {
      this.productList = response.result;
    }    
  }

  async onClickUpdate(country2: Product) {
    const { value: formValues } = await Swal.fire({
      title: 'Ingresa la nueva información',
      html:        
        '<input id="swal-input2" class="swal2-input" placeholder="Descripción Producto">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',      
      preConfirm: () => {
        if((document.getElementById('swal-input2') as HTMLInputElement).value){
          return [
            (document.getElementById('swal-input2') as HTMLInputElement).value            
          ]
        }else{
            Swal.showValidationMessage('Por favor llenar todos los campos')
        }
      }
    });

    // Si el usuario hizo clic en el botón "Confirmar" y proporcionó valores, mostramos una alerta con esos valores
    if (formValues) {
      country2.description = formValues[0]
      let res = await this._productService.UpdateProduct(country2)

      if (res.success) {
        Swal.fire(
          'Ingreso',
          'Se actualizó producto correctamente',
          'success'
        )
        this.ngOnInit()
      }
    }
  }

  async onClickAdd() {
    // Mostramos la alerta y solicitamos al usuario que ingrese cuatro valores
    const { value: formValues } = await Swal.fire({
      title: 'Ingresa la Informacíon requerida',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Partida arancelaria">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Descripción Producto">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      preConfirm: () => {
        
          if((document.getElementById('swal-input1') as HTMLInputElement).value && (document.getElementById('swal-input2') as HTMLInputElement).value){
            return [
              (document.getElementById('swal-input1') as HTMLInputElement).value,
              (document.getElementById('swal-input2') as HTMLInputElement).value
            ]
          }else {
            Swal.showValidationMessage('Por favor llenar todos los campos');
          }           
      }
    });

    // Si el usuario hizo clic en el botón "Confirmar" y proporcionó valores, mostramos una alerta con esos valores
    if (formValues) {

      let country: Product = {
        tariffItem: formValues[0],
        description: formValues[1]
      };

      let res = await this._productService.AddProduct(country)

      if (res.success) {
        Swal.fire(
          'Ingreso',
          'Se ingresó el nuevo producto correctamente',
          'success'
        )

        this.ngOnInit()
      }

    }

  }

}

