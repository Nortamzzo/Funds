import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget/budget.component';
import { SidebarModule } from '@app/sidebar/sidebar.module';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { BudgetTableComponent } from './budget-table/budget-table.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BudgetComponent,
    BudgetCardComponent,
    BudgetTableComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    FormsModule,
    SharedModule,
    SidebarModule
  ],
  exports: [
    BudgetComponent
  ]
})
export class BudgetModule { }
