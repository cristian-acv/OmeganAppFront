import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanieDetailComponent } from './companie-detail.component';

describe('CompanieDetailComponent', () => {
  let component: CompanieDetailComponent;
  let fixture: ComponentFixture<CompanieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanieDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
