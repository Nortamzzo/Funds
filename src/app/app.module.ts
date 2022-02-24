import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { LedgerModule } from './ledger/ledger.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '@env/environment';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './footer/footer.module';
import { ShellModule } from './shell/shell.module';
import { OrdinalDatePipe } from './app-utils/ordinal-dates';
import { MaterialModule } from './mat/material/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    SharedModule,
    LedgerModule,
    ShellModule
  ],
  providers: [
    DatePipe,
    OrdinalDatePipe,
    { provide: 'BASE_URL', useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
