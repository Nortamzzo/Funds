import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarReceiptsComponent } from './sidebar-receipts.component';

describe('SidebarReceiptsComponent', () => {
  let component: SidebarReceiptsComponent;
  let fixture: ComponentFixture<SidebarReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
