import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPresetTransactionsOverviewComponent } from './sidebar-preset-transactions-overview.component';

describe('SidebarPresetTransactionsOverviewComponent', () => {
  let component: SidebarPresetTransactionsOverviewComponent;
  let fixture: ComponentFixture<SidebarPresetTransactionsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPresetTransactionsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPresetTransactionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
