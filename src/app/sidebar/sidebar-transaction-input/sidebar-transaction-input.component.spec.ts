import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTransactionInputComponent } from './sidebar-transaction-input.component';

describe('SidebarTransactionInputComponent', () => {
  let component: SidebarTransactionInputComponent;
  let fixture: ComponentFixture<SidebarTransactionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarTransactionInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTransactionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
