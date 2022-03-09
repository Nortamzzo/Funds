import { Component, OnInit } from '@angular/core';
import { ItemData, ItemList } from '@app/app-models/item-models';
import { ReceiptData, ReceiptItemData } from '@app/app-models/receipt-models';
import { NoReceiptList } from '@app/app-models/transaction-models';
import { ItemService } from '@app/items/item.service';
import { ReceiptService } from '@app/receipt/receipt.service';
import { TransactionService } from '@app/app-services/data/transaction.service';
import { NotificationService } from '@app/app-services/notification.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  public receiptData!: ReceiptData[];
  public receiptItemData!: ReceiptItemData[];
  public transactionList: NoReceiptList[] = [];
  public itemData: ItemData[] = [];
  public itemList!: any;
  public receiptView: boolean = false;
  public receiptViewId: number | null = null;

  constructor(
    private recService: ReceiptService,
    private itemService: ItemService,
    private transService: TransactionService,
    private notif: NotificationService
  ) {
    /**
     * Update ReceiptItemData when adding new blank item to receipt
     */
    this.notif.getReceiptItemNotif().subscribe(
      data => {
        if (data) {
          this.getReceiptItemData(this.receiptViewId!);
        }
      }
    );
    /**
     * Update transactionList after adding new transaction
     */
    this.notif.getTransNotif().subscribe(
      data => {
        if (data) {
          this.getNoReceiptList();
        }
      }
    );
    /**
     * Update receiptItem and receiptItemData when adding new Item from receipt
     * Update receiptItem and receiptItemData when adding new Item from list
     */
    this.notif.getAddReceiptItemSubNotif().subscribe(
      data => {
        if (data.status) {
          this.getReceiptData(data.ReceiptId);
          this.getReceiptItemData(data.ReceiptId);
        }
      }
    )
  }

  ngOnInit(): void {
    this.getItemList();
  }

  /**
   * Sets receipt Id in receipt-view
   * Gets data, sends to receipt-view
   * 2/20/22
   * @param data Receipt Id
   */
  setReceiptViewId(data: number) {
    this.receiptViewId = data;
    this.getReceiptData(data);
    this.getReceiptItemData(data);
    setTimeout(() => {
      this.receiptView = true;
    }, 250);
  }

  /**
   * Gets list of transactions without receipts
   * 2/21/22
   */
  getNoReceiptList() {
    this.recService.getTransWithoutReceipts().subscribe(
      data => {
        this.transactionList = JSON.parse(JSON.stringify(data));
      }
    )
  }

  /**
   * Adds new receipt
   * Opens receipt view with new receipt data
   * 2/21/22
   * @param $event 
   */
  addNewReceipt($event: any) {
    this.recService.addNewReceipt($event.target.value).subscribe(
      data => {
        this.receiptViewId = data;
        this.getReceiptData(this.receiptViewId!);
      }
    )
    setTimeout(() => {
      this.receiptView = true;
    }, 250);
  }

  /**
   * Gets receipt data
   * 2/20/22
   * @param data 
   */
  getReceiptData(data: number) {
    this.recService.getReceiptData(data).subscribe(
      data => {
        this.receiptData = JSON.parse(JSON.stringify(data));
      }
    )
  }

  /**
   * Gets receiptItem data
   * 2/20/22
   * @param data 
   */
  getReceiptItemData(data: number) {
    this.recService.getReceiptItemData(data).subscribe(
      data => {
        this.receiptItemData = JSON.parse(JSON.stringify(data));
      }
    )
  }

  /**
   * Add ReceiptItem with null Itemid
   * @param $event 
   */
  addNewBlankReceiptItem($event: number | null) {
    console.log(this.receiptViewId)
    if ($event) {
      this.recService.addBlankReceiptItem(this.receiptViewId!).subscribe(
        data => {
          this.getReceiptItemData(this.receiptViewId!);
        }
      )
    }
  }

  /**
   * Get itemList
   */
  getItemList() {
    this.itemService.getItemList().subscribe(
      data => {
        this.itemList = data;
      }
    )
  }

  /**
   * Handle output from app-receipt-view
   * Add new item to Item, add ItemId to ReceiptItem
   * @param $event 
   */
  receiveNewItem($event: any) {
    this.itemService.addNewItemFromReceipt($event).subscribe();
    this.getReceiptItemData($event.ReceiptId);
  }

  /**
   * Update receiptItem quantity
   * @param $event UserId, ReceiptItemId, UpdateValue
   */
  receiveUpdateQuantity($event: any) {
    this.recService.updateReceiptItemQuantity($event).subscribe();
  }

  /**
   * Update receiptItem amount
   * @param $event UserId, ReceiptItemId, UpdateValue
   */
  receiveUpdateAmount($event: any) {
    let request = {
      ReceiptItemId : $event.ReceiptItemId,
      UpdateValue : $event.Amount
    }
    this.recService.updateReceiptItemAmount(request).subscribe();
  }

  /**
   * Update Transation Tax
   * @param $event TransactionId, UpdateValue
   */
  receiveUpdateTax($event: any) {
    let request = {
      transactionId: $event.Transactionid,
      column: "Tax",
      value: $event.value
    }
    this.transService.updateTransaction(request).subscribe();
  }

}
