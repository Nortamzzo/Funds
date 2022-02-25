import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { ReceiptViewComponent } from './receipt-view/receipt-view.component';
import { OrdinalDatePipe } from '@app/app-utils/ordinal-dates';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@app/mat/material/material.module';
import { TabDirective } from '@app/app-utils/auto-tab.directive';
import { ItemTitleAutoCompleteComponent } from './item-title-auto-complete/item-title-auto-complete.component';

@NgModule({
  declarations: [
    ReceiptComponent,
    ReceiptListComponent,
    ReceiptViewComponent,
    TabDirective,
    ItemTitleAutoCompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialModule
  ],
  exports: [
    ReceiptComponent
  ]
})
export class ReceiptModule { }
