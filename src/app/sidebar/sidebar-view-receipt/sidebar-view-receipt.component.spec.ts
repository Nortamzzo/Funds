import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarViewReceiptComponent } from './sidebar-view-receipt.component';

describe('SidebarViewReceiptComponent', () => {
  let component: SidebarViewReceiptComponent;
  let fixture: ComponentFixture<SidebarViewReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarViewReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarViewReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
