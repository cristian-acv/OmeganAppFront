import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreApprovedHistoryComponent } from './pre-approved-history.component';

describe('PreApprovedHistoryComponent', () => {
  let component: PreApprovedHistoryComponent;
  let fixture: ComponentFixture<PreApprovedHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreApprovedHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreApprovedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
