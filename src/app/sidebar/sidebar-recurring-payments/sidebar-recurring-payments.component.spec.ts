import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRecurringPaymentsComponent } from './sidebar-recurring-payments.component';

describe('SidebarRecurringPaymentsComponent', () => {
  let component: SidebarRecurringPaymentsComponent;
  let fixture: ComponentFixture<SidebarRecurringPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarRecurringPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRecurringPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
