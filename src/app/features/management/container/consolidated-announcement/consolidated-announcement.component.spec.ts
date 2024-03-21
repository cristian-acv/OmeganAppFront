import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedAnnouncementComponent } from './consolidated-announcement.component';

describe('ConsolidatedAnnouncementComponent', () => {
  let component: ConsolidatedAnnouncementComponent;
  let fixture: ComponentFixture<ConsolidatedAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
