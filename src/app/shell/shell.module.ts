import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { NavbarModule } from '@app/navbar/navbar.module';
import { SidebarModule } from '@app/sidebar/sidebar.module';
import { FooterModule } from '@app/footer/footer.module';



@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SidebarModule,
    FooterModule
  ],
  exports: [
    ShellComponent
  ]
})
export class ShellModule { }
