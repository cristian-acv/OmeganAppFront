import { Injectable } from '@angular/core';
import { typeApi, typeRequest } from 'src/app/core/enums';
import { ApiService } from 'src/app/core/services/api/api.service';
import { CompaniesListResponse, Company, CompanyResponse, companyUpdate, Country, CountryResponse, DeleteCountryResponse, PreAprovadoResponse, Trm, TrmResponse, UpdateCompaniesResponse} from '../../models';
import { ResponsePreLiq } from '../../models/compensation2';
import { ConsolidateAnnouncementResponse } from '../../models/ConsolidateAnnouncement';
import { Time } from '@angular/common';
import { PreAprovadoHistoryResponse } from '../../models/preaprobado-history';
import { LiquidationHistoryResponse } from '../../models/liquidation-history';


@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
  private _apiService: ApiService) { }

  public async GetAllCompanyAnnouncements(state:number): Promise<CompaniesListResponse> {

    let result = await this._apiService.getDataPromise<any,CompaniesListResponse>(
      typeApi.default,
      `/Company/GetAllCompanyAnnouncements?state=${state}`,
      typeRequest.Get,
    );
    return result;
  }
  
  public async GetCompanyById(id:number): Promise<CompanyResponse> {
    let result = await this._apiService.getDataPromise<any,CompanyResponse>(
      typeApi.default,
      `/Company/GetCompanyById?id=${id}`,
      typeRequest.Get,
    );
    return result;
  }

  public async UpdateCompany(company?:companyUpdate): Promise<UpdateCompaniesResponse> {
    let result = await this._apiService.getDataPromise<any,UpdateCompaniesResponse>(
      typeApi.default,
      `/Company/UpdateState`,
      typeRequest.Put,
      company
    );
    return result;
  }

  public async DeleteCompany(idCompany?:number): Promise<UpdateCompaniesResponse> {
    let result = await this._apiService.getDataPromise<any,UpdateCompaniesResponse>(
      typeApi.default,
      `/Company/${idCompany}`,
      typeRequest.Delete,
    );
    return result;
  }

  public async DeleteArchiveConvenio(idCompany?:number): Promise<UpdateCompaniesResponse> {
    let result = await this._apiService.getDataPromise<any,UpdateCompaniesResponse>(
      typeApi.default,
      `/Archives/${idCompany}`,
      typeRequest.Delete,
    );
    return result;
  }

  public async DeleteArchiveAnnouncement(Idannouncement?:number, group?: number): Promise<UpdateCompaniesResponse> {
    let result = await this._apiService.getDataPromise<any,UpdateCompaniesResponse>(
      typeApi.default,
      `/ArchivesAnnouncement?AnnouncementId=${Idannouncement}&Group=${group}`,
      typeRequest.Delete,
    );
    return result;
  }

  public async SendEmail(to:string, subject:string,emailBody: string ): Promise<UpdateCompaniesResponse> {
    let result = await this._apiService.getDataPromise<any,UpdateCompaniesResponse>(
      typeApi.default,
      `/Email/SendEmail?to=${to}&subject=${subject}&emailBody=${emailBody}`,
      typeRequest.Get,
    );
    return result;
  }

  public async SendEmailGeneral(to:string, subject:string, title:string, reason: string ): Promise<UpdateCompaniesResponse> {
    let result = await this._apiService.getDataPromise<any,UpdateCompaniesResponse>(
      typeApi.default,
      `/Email/SendEmailGeneral?to=${to}&subject=${subject}&title=${title}&reason=${reason}`,
      typeRequest.Get,
    );
    return result;
  }

  public async GetAllCountry(): Promise<CountryResponse> {
    let result = await this._apiService.getDataPromise<any,CountryResponse>(
      typeApi.default,
      `/Country/GetAllCountry`,
      typeRequest.Get,
    );
    return result;
  }

  public async DeleteCountry(id:number): Promise<DeleteCountryResponse> {    
    let result = await this._apiService.getDataPromise<any,DeleteCountryResponse>(
      typeApi.default,
      `/Country/${id}`,
      typeRequest.Delete,
    );
    return result;
  }

  public async UpdateCountry(country:Country): Promise<DeleteCountryResponse> {
    let result = await this._apiService.getDataPromise<Country,DeleteCountryResponse>(
      typeApi.default,
      `/Country/UpdateCountry`,
      typeRequest.Put,
      country
    );
    return result;
  }

  public async AddCountry(country:Country): Promise<DeleteCountryResponse> {
    let result = await this._apiService.getDataPromise<Country,DeleteCountryResponse>(
      typeApi.default,
      `/Country/CreateCountry`,
      typeRequest.Post,
      country
    );
    return result;
  }

  public async UpdateTrm(trm:Trm): Promise<DeleteCountryResponse> {
    let result = await this._apiService.getDataPromise<any,DeleteCountryResponse>(
      typeApi.default,
      `/TRM/UpdateTRM`,
      typeRequest.Put,
      trm
    );
    return result;
  }

  public async GetTrm(): Promise<TrmResponse> {
    let result = await this._apiService.getDataPromise<any,TrmResponse>(
      typeApi.default,
      `/TRM/GetTRM`,
      typeRequest.Get
    );
    return result;
  }

  public async GetPreaprobado(valor: boolean): Promise<PreAprovadoResponse> {
    let result = await this._apiService.getDataPromise<any,PreAprovadoResponse>(
      typeApi.default,
      `/Calculate/GetPreaprobado?action=${valor}`,
      typeRequest.Get
    );
    return result;
  }

  public async GetConsolidatedAnnouncement(): Promise<ConsolidateAnnouncementResponse> {
    let result = await this._apiService.getDataPromise<any, ConsolidateAnnouncementResponse>(
      typeApi.default,
      `/reports/GetAnnouncementsByCompanyState?State=2`,
      typeRequest.Get
    );
    return result
  }

  /*public async GetCompensation(): Promise<ResponsePreLiq> {
    let result = await this._apiService.getDataPromise<any,ResponsePreLiq>(
      typeApi.default,
      `/Calculate/GetCompensation`,
      typeRequest.Get
    );
    return result;
  }*/

  public async GetCompensation(valor: boolean): Promise<ResponsePreLiq> {
    let result = await this._apiService.getDataPromise<any,ResponsePreLiq>(
      typeApi.default,
      `/Calculate/GetCompensation?action=${valor}`,
      typeRequest.Get
    );
    return result;
  }


  public async GetPreaprobadoHistory(InitialDate: string, EndDate: string): Promise<PreAprovadoHistoryResponse> {
    let result = await this._apiService.getDataPromise<any,PreAprovadoHistoryResponse>(
      typeApi.default,
      `/Calculate/GetPreaprobadoHistory?InitialDate=${InitialDate}&EndDate=${EndDate}`,
      typeRequest.Get
    );
    return result;
  }

  public async GetLiquidationHistory(InitialDate: string, EndDate: string): Promise<LiquidationHistoryResponse> {
    let result = await this._apiService.getDataPromise<any,PreAprovadoHistoryResponse>(
      typeApi.default,
      `/Calculate/GetCompensationHistory?InitialDate=${InitialDate}&EndDate=${EndDate}`,
      typeRequest.Get
    );
    return result;
  }
  
  
}
