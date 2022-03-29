import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerToolbarComponent } from './ledger-toolbar.component';

describe('LedgerToolbarComponent', () => {
  let component: LedgerToolbarComponent;
  let fixture: ComponentFixture<LedgerToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
