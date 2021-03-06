import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { NavbarModule } from '@app/navbar/navbar.module';
import { SidebarModule } from '@app/sidebar/sidebar.module';
import { FooterModule } from '@app/footer/footer.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarLinksSettingsComponent } from './navbar/navbar-links-settings/navbar-links-settings.component';
import { NavbarSettingsComponent } from './navbar/navbar-settings/navbar-settings.component';
import { SidebarSettingsComponent } from './sidebar/sidebar-settings/sidebar-settings.component';
import { MaterialModule } from '@app/mat/material/material.module';
import { SidebarSectionButtonsComponent } from './sidebar/sidebar-section-buttons/sidebar-section-buttons.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    NavbarLinksSettingsComponent,
    NavbarSettingsComponent,
    SidebarSettingsComponent,
    SidebarSectionButtonsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    SidebarModule,
    FooterModule,
    MaterialModule
  ]
})
export class AdminModule { }
