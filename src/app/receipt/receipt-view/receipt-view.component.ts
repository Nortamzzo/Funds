import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ItemData } from '@app/app-models/item-models';
import { ReceiptData, ReceiptItemData } from '@app/app-models/receipt-models';
import { ItemService } from '@app/app-services/data/item.service';
import { AutoCompleteComponent } from '../../shared/components/auto-complete/auto-complete.component';
import { ReceiptService } from '@app/app-services/data/receipt.service';
import { viewClassName } from '@angular/compiler';

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
  @Input() public itemData: ItemData[] = [];
  @Input() public itemList: any[] = [];
  public receiptData: ReceiptData[] = [];
  public receiptItemData: ReceiptItemData[] = [];
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
  public newItemRow: number | null = null;

  constructor(
    private itemService: ItemService,
    private recService: ReceiptService
  ) {
    this.recService.getReceiptViewId().subscribe(
      data => {
        if (data.status) {
          this.receiptId = data.ReceiptId;
          this.getReceiptData(this.receiptId);
          this.getReceiptItemData(this.receiptId);
          setTimeout(() => {
            this.receiptView = true;
          }, 250);
        }
      }
    );
  }

  ngOnInit(): void {
    this.getItemData();
  }

  /**
   * Create new blank item, display in table
   */
  addNewBlankItem() {
    this.recService.addBlankReceiptItem(this.receiptId).subscribe(
      data => {
        setTimeout(() => {
          this.getReceiptItemData(this.receiptId);
        }, 250);
      }
    )
  }

  public itemTitle!: string;
  addNewItem(item: any) {
    this.titleRow = null;
    setTimeout(() => {
      this.getReceiptItemData(item.ReceiptId);
    }, 250);
  }

  cancelEdit() {
    this.editItemCol = 0;
    this.editItemRow = 0;
    this.editReceiptRow = null
  }

  editTaxValue(data: any) {
    this.sendUpdateTax.emit(data);
  }

  cancelNewItem() {
    this.addNewItem = null;
  }

  cancelSelect() {
    this.editItemCol = null;
    this.editItemRow = null;
  }

  clearSearchField(item: any) {
  }

  deleteReceiptItem(item: ReceiptItemData) {
    this.recService.deleteReceiptItem(item.ReceiptItemId).subscribe(
      data => {
        this.getReceiptItemData(data[0].ReceiptId);
      }
    );
  }

  editTitleValue($event: any) {
    // console.log($event.target.value)
  }

  editQuantityValue(data: any) {
    this.sendUpdateQuantity.emit(data);
  }

  editAmountValue(data: any) {
    this.sendUpdateAmount.emit(data);
  }

  /**
   * Get itemList
   */
  getItemData() {
    this.itemService.getItemData().subscribe(
      data => {
        this.itemData = JSON.parse(JSON.stringify(data));
      }
    )
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

  getNewItem() {

  }

  /**
   * Gets receipt data
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

  setEditItemMode(row: number, col: number) {
    this.newItemRow = null;
    this.editItemRow = row;
    this.editItemCol = col;
  }

  setReceiptEdit(row: number) {
    this.editReceiptRow = row;
  }

  setNewItemMode(row: number) {
    if (!(this.newItemRow === row)) {
      this.newItemRow = row;
    } else {
      this.newItemRow = null;
    }
  }

  updateItem(item: ItemData) {
    this.recService.updateReceiptItem(item).subscribe(
      data => {
        setTimeout(() => {
        }, 350);
        this.getReceiptItemData(data.receiptId)
      }
    );
  }

  /**
   * Set ReceiptItem Item Title
   * Set ReceiptItem ItemId from ItemTitle
   * @param $event 
   */
  updateReceiptItemTitle($event: any) {
    // console.log($event)
    // if ($event.exist) {
    //   this.recService.updateReceiptItemTitle($event).subscribe(
    //     data => {
    //       setTimeout(() => {
    //       }, 350);
    //       // this.getReceiptItemData(data[0].ReceiptId)
    //     }
    //   );
    // } else {
    // 
    // }
    // this.recService.updateReceiptItemTitle($event).subscribe(
    //   data => {
    //     setTimeout(() => {
    //     }, 350);
    //     console.log(data)
    //     this.getReceiptItemData(data.ReceiptId)
    //   }
    // );
    // let req = {
    //   ReceiptItemId: item.ReceiptItemId,
    //   UpdateValue: $event.value
    // }
    // this.recService.updateReceiptItemTitle(req).subscribe(
    //   data => {
    //     setTimeout(() => {
    //     }, 350);
    //     this.getReceiptItemData(data[0].ReceiptId)
    //   }
    // );
    // setTimeout(() => {
    //   this.editItemCol = null;
    //   this.editItemRow = null;
    // }, 350)

  }

  test() {
    console.log(this.receiptData)
    console.log(this.receiptItemData)
  }

}
