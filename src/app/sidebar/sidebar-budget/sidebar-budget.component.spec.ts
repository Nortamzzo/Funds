import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBudgetComponent } from './sidebar-budget.component';

describe('SidebarBudgetComponent', () => {
  let component: SidebarBudgetComponent;
  let fixture: ComponentFixture<SidebarBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
