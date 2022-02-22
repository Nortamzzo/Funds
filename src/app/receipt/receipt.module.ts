import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { ReceiptViewComponent } from './receipt-view/receipt-view.component';
import { OrdinalDatePipe } from '@app/app-utils/ordinal-dates';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ReceiptComponent,
    ReceiptListComponent,
    ReceiptViewComponent,
    OrdinalDatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    ReceiptComponent
  ]
})
export class ReceiptModule { }
