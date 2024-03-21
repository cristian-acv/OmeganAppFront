import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationHistoryComponent } from './liquidation-history.component';

describe('LiquidationHistoryComponent', () => {
  let component: LiquidationHistoryComponent;
  let fixture: ComponentFixture<LiquidationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidationHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
