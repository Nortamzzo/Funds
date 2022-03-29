import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerTransactionInputComponent } from './ledger-transaction-input.component';

describe('LedgerTransactionInputComponent', () => {
  let component: LedgerTransactionInputComponent;
  let fixture: ComponentFixture<LedgerTransactionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerTransactionInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerTransactionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
