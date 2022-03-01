import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ItemData } from '@app/app-models/item-models';
import { ReceiptData, ReceiptItemData } from '@app/app-models/receipt-models';
import { ItemService } from '@app/app-services/data/item.service';
import { AutoCompleteComponent } from '../../shared/components/auto-complete/auto-complete.component';
import { ReceiptService } from '@app/app-services/data/receipt.service';

@Component({
  selector: 'app-receipt-view',
  templateUrl: './receipt-view.component.html',
  styleUrls: ['./receipt-view.component.scss']
})
export class ReceiptViewComponent implements OnInit {
  @ViewChild(AutoCompleteComponent) private autocomplete!: AutoCompleteComponent;
  @Output() public sendNewItem = new EventEmitter<any>();
  @Output() public newBlankReceiptItem = new EventEmitter<any>();
  @Output() public sendUpdateQuantity = new EventEmitter<any>();
  @Output() public sendUpdateAmount = new EventEmitter<any>();
  @Output() public sendUpdateTax = new EventEmitter<any>();
  @Input() public receiptView: boolean = false;
  public receiptData: ReceiptData[] = [];
  public receiptItemData: ReceiptItemData[] = [];
  @Input() public itemData: ItemData[] = [];
  @Input() public itemList: string[] = [];
  public receiptId: number | null = null;
  public model: any;
  public titleRow: number | null = null;
  public quantityRow: number | null = null;
  public amountRow: number | null = null;
  public informationRow: number | null = null;
  public editTaxMode: boolean = false;
  public editItemRow: number | null = null;
  public editItemCol: number | null = null;
  public editReceiptRow: number | null = null;



  constructor(
    private itemService: ItemService,
    private recService: ReceiptService
  ) {
    this.recService.getReceiptViewId().subscribe(
      data => {
        if (data.status) {
          this.receiptId = data.ReceiptId;
          this.getReceiptData(data.ReceiptId);
          this.getReceiptItemData(data.ReceiptId);
          setTimeout(() => {
            this.receiptView = true;
          }, 250);
        }
      }
    );
  }

  ngOnInit(): void {
    console.log('itemList: ', this.itemList)
  }

  /**
   * Create new blank item, display in table
   */
  addNewBlankItem() {
    this.recService.addBlankReceiptItem(this.receiptId).subscribe(
      data => {
        this.getReceiptItemData(this.receiptId!);
      }
    )
  }

  public itemTitle!: string;
  addNewItem(item: ReceiptItemData) {
    // this.autocomplete.setText();
    let req = {
      ReceiptId: item.ReceiptId,
      ReceiptItemId: item.ReceiptItemId,
      itemTitle: this.itemTitle
    };
    this.sendNewItem.emit(req);
    this.titleRow = null;
    setTimeout(() => {
      this.getReceiptItemData(item.ReceiptId);
    }, 250);
  }

  /**
   * Get list of ItemData
   */
  getItemList() {
    this.itemService.getItemList().subscribe(
      data => {
        this.itemList = data;
        this.getReceiptData(this.receiptId!);
        this.getReceiptItemData(this.receiptId!);

      }
    )
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
 * Get receiptItemData
 * @param id ReceiptId
 */
  getReceiptItemData(id: number) {
    this.recService.getReceiptItemData(id).subscribe(
      data => {
        this.receiptItemData = JSON.parse(JSON.stringify(data));
      }
    )
  }

  setReceiptEdit(row: number) {
    this.editReceiptRow = row;
  }

  setItemEdit(row: number, col: number) {
    this.editItemRow = row;
    this.editItemCol = col;
  }

  cancelEdit() {
    this.editItemCol = 0;
    this.editItemRow = 0;
    this.editReceiptRow = null
  }

  editTitleValue($event: any) {
    console.log($event.target.value)
  }

  editQuantityValue(data: any) {
    this.sendUpdateQuantity.emit(data);
  }

  editAmountValue(data: any) {
    this.sendUpdateAmount.emit(data);
  }

  editTaxValue(data: any) {
    this.sendUpdateTax.emit(data);
  }

  clearSearchField(item: any) {
    console.log(item);
  }

  /**
   * Set ReceiptItem Item Title
   * Set ReceiptItem ItemId from ItemTitle
   * @param $event 
   */
  updateReceiptItemTitle($event: any, item: any) {
    let req = {
      ReceiptItemId: item.ReceiptItemId,
      UpdateValue: $event.value
    }
    this.recService.updateReceiptItemTitle(req).subscribe(
      data => {
        setTimeout(() => {
        }, 350);
        this.getReceiptItemData(data[0].ReceiptId)
      }
    );
    setTimeout(() => {
      this.editItemCol = null;
      this.editItemRow = null;
    }, 350)

  }



  deleteItem($event: any) {
    console.log("Delete", $event);
  }

  deleteReceiptItemById(id: number) {
    console.log("dddddd")
    this.recService.deleteReceiptItem(id).subscribe(
      // data => {
      //   if (data) {
      //     console.log(data)
      //     this.getReceiptItemData(data);
      //   }
      // }
    )
  }

  test() {
    console.log(this.receiptData)
    console.log(this.receiptItemData)
  }

}
