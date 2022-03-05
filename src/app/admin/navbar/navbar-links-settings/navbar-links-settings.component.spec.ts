import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLinksSettingsComponent } from './navbar-links-settings.component';

describe('NavbarLinksSettingsComponent', () => {
  let component: NavbarLinksSettingsComponent;
  let fixture: ComponentFixture<NavbarLinksSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLinksSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLinksSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
