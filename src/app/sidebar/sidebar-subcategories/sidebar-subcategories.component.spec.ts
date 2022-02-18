import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSubcategoriesComponent } from './sidebar-subcategories.component';

describe('SidebarSubcategoriesComponent', () => {
  let component: SidebarSubcategoriesComponent;
  let fixture: ComponentFixture<SidebarSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSubcategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
