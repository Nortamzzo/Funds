import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLedgerFilterComponent } from './sidebar-ledger-filter.component';

describe('SidebarLedgerFilterComponent', () => {
  let component: SidebarLedgerFilterComponent;
  let fixture: ComponentFixture<SidebarLedgerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarLedgerFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLedgerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
