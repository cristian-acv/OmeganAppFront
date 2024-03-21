import { TestBed } from '@angular/core/testing';

import { ArchivesDetailService } from './archives-detail.service';

describe('ArchivesDetailService', () => {
  let service: ArchivesDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivesDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
