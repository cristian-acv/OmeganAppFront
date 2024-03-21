import { Component, OnInit } from '@angular/core';
import { ConsolidateAnnouncementAnnouncement, ConsolidateAnnouncementCompany } from '../../models/ConsolidateAnnouncement';
//import { ConsolidateAnnouncementCompany, ConsolidateAnnouncementAnnouncement } from '../../models';
import { CompaniesService } from '../../services/companies/companies.service';
import { ExcelService } from '../../services/excel/excel.service';

@Component({
  selector: 'app-consolidated-announcement',
  templateUrl: './consolidated-announcement.component.html',
  styleUrls: ['./consolidated-announcement.component.scss']
})
export class ConsolidatedAnnouncementComponent implements OnInit {
  
  public companyList: ConsolidateAnnouncementCompany[] = [];
  public announcementList: ConsolidateAnnouncementAnnouncement[] = [];  

  constructor(private _companiesService: CompaniesService,
    private _excelService: ExcelService) { }

  async ngOnInit(): Promise<void> {
    await this.GetConsolidatedAnnouncement();
  }

  async GetConsolidatedAnnouncement(): Promise<void> {
    let res = await this._companiesService.GetConsolidatedAnnouncement()

    if (res.success) {
      this.companyList = res.result      
    }
  }
}
