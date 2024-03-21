import { Injectable } from '@angular/core';
import { typeApi, typeRequest } from 'src/app/core/enums';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ArchivesListResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ArchivesDetailService {

  constructor(private _apiService: ApiService) { }


  public async GetArchivesByCompany(companyId : number): Promise<ArchivesListResponse> {

    let result = await this._apiService.getDataPromise<any,ArchivesListResponse>(
      typeApi.default,
      `/Archives/GetArchivesByCompany?companyId=${companyId}`,
      typeRequest.Get,
    );
    return result;
  }
  
}
