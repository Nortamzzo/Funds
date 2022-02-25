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
  @Input() public receiptData: ReceiptData[] = [];
  @Input() public receiptItemData: ReceiptItemData[] = [];
  @Input() public itemData: ItemData[] = [];
  @Input() public itemList: string[] = [];
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
  ) { }

  ngOnInit(): void { }

  getItemList() {
    this.itemService.getItemList().subscribe(
      data => {
        this.itemList = data;
      }
    )
  }

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
    console.log("Test Cancel")
    this.editItemCol = 0;
    this.editItemRow = 0;
    this.editReceiptRow = null
  }

  insertNewItem() {
    this.newBlankReceiptItem.emit(true);
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

  setItemTitle($event: any) {
    console.log("Select: ", $event)
  }

  updateTitle() {

  }

  deleteItem($event: any) {
    console.log("Delete", $event);
  }

  public itemTitle!: string;
  addNewItem(item: ReceiptItemData) {
    this.autocomplete.setText();
    let req = {
      ReceiptId : item.ReceiptId,
      ReceiptItemId : item.ReceiptItemId,
      itemTitle : this.itemTitle
    };
    this.sendNewItem.emit(req);
    this.titleRow = null;
    setTimeout(() => {
      this.getReceiptItemData(item.ReceiptId);
    }, 250);
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
   
  }
}
