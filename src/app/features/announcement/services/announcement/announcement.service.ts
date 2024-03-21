import { Injectable } from '@angular/core';
import { typeApi, typeRequest } from 'src/app/core/enums';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AnnouncementRegisterResponse, Archive, ArchiveOne, ArchiveTwo } from 'src/app/features/auth/models';
import { ArchivesListResponse, UpdateCompaniesResponse } from 'src/app/features/management/models';
import { Announcement, AnnouncementDetailResponse, AnnouncementDos, AnnouncementUpdate, AnnouncementUpdateByIdByState, AnnouncementUpdateByIdByStateResponse, CompanyResResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(
    private _apiService: ApiService) { }

  public async GetCompany(userid:string): Promise<CompanyResResponse> {

    let result = await this._apiService.getDataPromise<any,CompanyResResponse>(
      typeApi.default,
      `/Company/${userid}`,
      typeRequest.Get,
    );
    return result;
  }

  public async RegisterAnnouncement(request:AnnouncementDos): Promise<AnnouncementRegisterResponse> {

    let result = await this._apiService.getDataPromise<AnnouncementDos,AnnouncementRegisterResponse>(
      typeApi.default,
      `/Announcement/RegisterAnnouncement`,
      typeRequest.Post,
      request
    );
    return result;
  }


  public async RegisterArchive(request:ArchiveOne): Promise<UpdateCompaniesResponse> {

    let result = await this._apiService.getDataPromise<ArchiveOne,UpdateCompaniesResponse>(
      typeApi.default,
      `/Archives/CreateArchive`,
      typeRequest.Post,
      request
    );
    return result;
  }

  public async RegisterArchiveAnnouncement(request:ArchiveTwo): Promise<UpdateCompaniesResponse> {

    let result = await this._apiService.getDataPromise<ArchiveTwo,UpdateCompaniesResponse>(
      typeApi.default,
      `/ArchivesAnnouncement/CreateArchive`,
      typeRequest.Post,
      request
    );
    return result;
  }

  public async GetAnnouncementsById(id:number): Promise<AnnouncementDetailResponse> {

    let result = await this._apiService.getDataPromise<any,AnnouncementDetailResponse>(
      typeApi.default,
      `/Announcement/GetAnnouncementsById?id=${id}`,
      typeRequest.Get,
    );
    return result;
  }


  public async GetArchivesByAnnouncement(id:number,idgroup: number): Promise<ArchivesListResponse> {

    let result = await this._apiService.getDataPromise<any,ArchivesListResponse>(
      typeApi.default,
      `/ArchivesAnnouncement/GetArchivesByAnnouncement?announcementId=${id}&group=${idgroup}`,
      typeRequest.Get,
    );
    return result;
  }

  public async UpdateAnnouncement(request:AnnouncementUpdate): Promise<AnnouncementDetailResponse> {

    let result = await this._apiService.getDataPromise<AnnouncementUpdate,AnnouncementDetailResponse>(
      typeApi.default,
      `/Announcement/UpdateAnnouncement`,
      typeRequest.Put,
      request
    );
    return result;
  }


  public async UpdateStateAnnouncementById(request:AnnouncementUpdateByIdByState): Promise<AnnouncementUpdateByIdByStateResponse> {
    let result = await this._apiService.getDataPromise<AnnouncementUpdateByIdByState,AnnouncementUpdateByIdByStateResponse>(
      typeApi.default,
      `/Announcement/UpdateStateAnnouncementById`,
      typeRequest.Put,
      request
    );
    return result;
  }
}