import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSectionButtonsComponent } from './sidebar-section-buttons.component';

describe('SidebarSectionButtonsComponent', () => {
  let component: SidebarSectionButtonsComponent;
  let fixture: ComponentFixture<SidebarSectionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSectionButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSectionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
