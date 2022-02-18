import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerComponent } from './ledger/ledger.component';
import { LedgerTableComponent } from './ledger-table/ledger-table.component';
import { SidebarModule } from '@app/sidebar/sidebar.module';
import { NavbarModule } from '@app/navbar/navbar.module';
import { ShellModule } from '@app/shell/shell.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    LedgerComponent,
    LedgerTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LedgerRoutingModule,
    NgbModule,
    SharedModule,
    SidebarModule
  ],
  exports: [
    LedgerComponent
  ]
})
export class LedgerModule { }
