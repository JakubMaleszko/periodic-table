import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodTableComponent } from './period-table.component';

describe('PeriodTableComponent', () => {
  let component: PeriodTableComponent;
  let fixture: ComponentFixture<PeriodTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
