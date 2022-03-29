import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerComponent } from './ledger/ledger.component';
import { LedgerTableComponent } from './ledger-table/ledger-table.component';
import { SidebarModule } from '@app/sidebar/sidebar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/mat/material/material.module';
import { LedgerToolbarComponent } from './ledger-toolbar/ledger-toolbar.component';
import { LedgerTransactionInputComponent } from './ledger-transaction-input/ledger-transaction-input.component';
import { NewTransactionModalComponent } from './new-transaction-modal/new-transaction-modal.component';


@NgModule({
  declarations: [
    LedgerComponent,
    LedgerTableComponent,
    LedgerToolbarComponent,
    LedgerTransactionInputComponent,
    NewTransactionModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LedgerRoutingModule,
    NgbModule,
    MaterialModule,
    SharedModule,
    SidebarModule
  ],
  entryComponents:[
    NewTransactionModalComponent
  ],
  exports: [
    LedgerComponent
  ]
})
export class LedgerModule { }
