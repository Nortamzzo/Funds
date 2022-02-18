import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbTransactionItimizerComponent } from './sb-transaction-itimizer.component';

describe('SbTransactionItimizerComponent', () => {
  let component: SbTransactionItimizerComponent;
  let fixture: ComponentFixture<SbTransactionItimizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbTransactionItimizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SbTransactionItimizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
