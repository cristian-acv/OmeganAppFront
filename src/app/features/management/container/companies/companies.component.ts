import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { Company } from '../../models/company-list';
import { CompaniesService } from '../../services/companies/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  public companiesList: Company[] = [];
  state : number;

  constructor(public fb: FormBuilder,
    private _companiesService: CompaniesService,
    private _jwtService:JwtService) { }

  companiesForm = this.fb.group({
  });

  async ngOnInit(): Promise<void> {
    await this.GetAllCompany();
  }


  /**
 * Get all company
 */

  public async GetAllCompany(): Promise<void> {

    let res = await this._companiesService.GetAllCompanyAnnouncements(999);

    if (res.success) {
      this.companiesList = res.result;      
    }
  }

  onBrake(companie: any) {
    localStorage.setItem('companyId', companie.id);

    localStorage.setItem('UsercompanyId', companie.userId);
  }

  public estadoCompany(status:Number): string{
    if(status == 0){
     return  'Nuevo Ingreso'
    } else if (status == 1){
     return  'Validacion Convenio'
    } else if(status == 2){
     return 'Anuncios habilitados'
    }else if(status == 3){
      return 'Validacion CFGL'
    }else{
     return 'Finalizado'
    }
 }

}
