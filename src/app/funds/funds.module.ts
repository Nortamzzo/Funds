import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundsRoutingModule } from './funds-routing.module';
import { FundsComponent } from './funds/funds.component';
import { NavbarModule } from '@app/navbar/navbar.module';
import { SidebarModule } from '@app/sidebar/sidebar.module';
import { FooterModule } from '@app/footer/footer.module';
import { LedgerModule } from '@app/ledger/ledger.module';
import { BudgetModule } from '@app/budget/budget.module';
import { ReceiptModule } from '@app/receipt/receipt.module';


@NgModule({
  declarations: [
    FundsComponent
  ],
  imports: [
    CommonModule,
    FundsRoutingModule,
    NavbarModule,
    SidebarModule,
    FooterModule,
    LedgerModule,
    BudgetModule,
    ReceiptModule
  ]
})
export class FundsModule { }
