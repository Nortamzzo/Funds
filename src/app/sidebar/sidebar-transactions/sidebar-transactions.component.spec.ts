import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTransactionsComponent } from './sidebar-transactions.component';

describe('SidebarTransactionsComponent', () => {
  let component: SidebarTransactionsComponent;
  let fixture: ComponentFixture<SidebarTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
