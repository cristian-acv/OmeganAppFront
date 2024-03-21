import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedCompensationComponent } from './consolidated-compensation.component';

describe('ConsolidatedCompensationComponent', () => {
  let component: ConsolidatedCompensationComponent;
  let fixture: ComponentFixture<ConsolidatedCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedCompensationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
