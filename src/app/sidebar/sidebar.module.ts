import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarToolbarComponent } from './sidebar-toolbar/sidebar-toolbar.component';
import { SidebarAccountsComponent } from './sidebar-accounts/sidebar-accounts.component';
import { SidebarCategoriesComponent } from './sidebar-categories/sidebar-categories.component';
import { AccountInputVerticalComponent } from './account-input-vertical/account-input-vertical.component';
import { CategoryInputVerticalComponent } from './category-input-vertical/category-input-vertical.component';
import { SidebarSubcategoriesComponent } from './sidebar-subcategories/sidebar-subcategories.component';
import { SubcategoryInputVerticalComponent } from './subcategory-input-vertical/subcategory-input-vertical.component';
import { SidebarTransactionsComponent } from './sidebar-transactions/sidebar-transactions.component';
import { SidebarTransactionInputComponent } from './sidebar-transaction-input/sidebar-transaction-input.component';
import { SidebarLedgerFilterComponent } from './sidebar-ledger-filter/sidebar-ledger-filter.component';
import { SidebarPresetTransactionsComponent } from './sidebar-preset-transactions/preset-transactions.component';
import { SidebarPresetTransactionsOverviewComponent } from './sidebar-preset-transactions-overview/sidebar-preset-transactions-overview.component';
import { SidebarBudgetComponent } from './sidebar-budget/sidebar-budget.component';
import { SbTransactionItimizerComponent } from './sb-transaction-itimizer/sb-transaction-itimizer.component';
import { SidebarReceiptsComponent } from './sidebar-receipts/sidebar-receipts.component';
import { SidebarViewReceiptComponent } from './sidebar-view-receipt/sidebar-view-receipt.component';
import { SharedModule } from '@app/shared/shared.module';
import { SidebarRecurringPaymentsComponent } from './sidebar-recurring-payments/sidebar-recurring-payments.component';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarToolbarComponent,
    SidebarAccountsComponent,
    SidebarCategoriesComponent,
    SidebarSubcategoriesComponent,
    AccountInputVerticalComponent,
    CategoryInputVerticalComponent,
    SubcategoryInputVerticalComponent,
    SidebarTransactionsComponent,
    SidebarTransactionInputComponent,
    SidebarLedgerFilterComponent,
    SidebarPresetTransactionsComponent,
    SidebarPresetTransactionsOverviewComponent,
    SidebarBudgetComponent,
    SbTransactionItimizerComponent,
    SidebarReceiptsComponent,
    SidebarViewReceiptComponent,
    SidebarRecurringPaymentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }