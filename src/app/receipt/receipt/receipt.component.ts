import { Component, OnInit } from '@angular/core';
import { ItemData, ItemList } from '@app/app-models/item-models';
import { ReceiptData, ReceiptItemData } from '@app/app-models/receipt-models';
import { NoReceiptList } from '@app/app-models/transaction-models';
import { ItemService } from '@app/app-services/data/item.service';
import { ReceiptService } from '@app/app-services/data/receipt.service';
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
    private notif: NotificationService
  ) {
    this.notif.getReceiptItemNotif().subscribe(
      data => {
        if (data) {
          this.getReceiptItemData(this.receiptViewId!);
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

  getItemList() {
    this.itemService.getItemList().subscribe(
      data => {
        this.itemList = JSON.stringify(data);
      }
    )
  }

}
