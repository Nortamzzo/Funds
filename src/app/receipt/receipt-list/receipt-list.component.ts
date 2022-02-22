import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoReceiptList, ReceiptList } from '@app/app-models/transaction-models';
import { ReceiptService } from '@app/app-services/data/receipt.service';
import { TransactionService } from '@app/app-services/data/transaction.service';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {
  @Output() receiptIdOutput = new EventEmitter<number>();
  @Output() newReceiptOutput = new EventEmitter<any>();
  public receiptList: ReceiptList[] = [];
  public transactionList: NoReceiptList[] = [];
  public transSelectMode: boolean = false;
  public receiptViewId: number | null = null;

  constructor(
    private recService: ReceiptService
  ) { }

  ngOnInit(): void {
    this.getNoReceiptList();
    this.getReceiptList();
  }

  /**
   * Toggles new receipt mode. 
   */
  selectTransaction() {
    this.transSelectMode = !this.transSelectMode;
  }

  /**
   * Gets list of Receipts
   * 2/20/22
   */
  getReceiptList() {
    this.recService.getReceiptList().subscribe(
      data => {
        this.receiptList = JSON.parse(JSON.stringify(data));
      }
    )
  }

  /**
   * Gets list of transactions without Receipt
   * 2/20/22
   */
  getNoReceiptList() {
    this.recService.getTransWithoutReceipts().subscribe(
      data => {
        this.transactionList = JSON.parse(JSON.stringify(data));
      }
    )
  }

  /**
   * Emits receipt view id
   * Emitter: receiptIdOutput
   * 2/20/22
   * @param data ReceiptId: number
   */
  setViewId(data: number) {
    this.receiptIdOutput.emit(data);
  }

  /**
   * Adds new blank receipt to db
   * Date: 2/20/22
   */
  addNewReceipt($event: any) {
    this.newReceiptOutput.emit($event);
  }

}
