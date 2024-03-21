import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreApprovedComponent } from './pre-approved.component';

describe('PreApprovedComponent', () => {
  let component: PreApprovedComponent;
  let fixture: ComponentFixture<PreApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreApprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
