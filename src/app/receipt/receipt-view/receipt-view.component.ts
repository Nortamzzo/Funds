import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ItemData, ItemList } from '@app/app-models/item-models';
import { ReceiptData, ReceiptItemData } from '@app/app-models/receipt-models';
import { ItemService } from '@app/app-services/data/item.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ItemTitleAutoCompleteComponent } from '../item-title-auto-complete/item-title-auto-complete.component';
import { ReceiptService } from '@app/app-services/data/receipt.service';

@Component({
  selector: 'app-receipt-view',
  templateUrl: './receipt-view.component.html',
  styleUrls: ['./receipt-view.component.scss']
})
export class ReceiptViewComponent implements OnInit {
  @ViewChild(ItemTitleAutoCompleteComponent) private autocomplete!: ItemTitleAutoCompleteComponent;
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

  public test: any;

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

  insertNewItem() {
    this.newBlankReceiptItem.emit(true);
  }

  editTitle(row: number) {
    this.getItemList();
    this.titleRow = row;
  }

  editTitleValue($event: any) {
    console.log($event.target.value)
  }

  editQuantity(row: number) {
    this.quantityRow = row;
  }

  editQuantityValue(data: any) {
    this.sendUpdateQuantity.emit(data);
  }

  editAmount(row: number) {
    this.amountRow = row;
  }

  editAmountValue(data: any) {
    this.sendUpdateAmount.emit(data);
  }

  editInformation(row: number) {
    this.informationRow = row;
  }

  editTax() {
    this.editTaxMode = !this.editTaxMode;
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

  cancelTitle() {
    this.titleRow = null;
  }

  deleteItem($event: any) {
    console.log("Delete", $event);
  }

  addNewItem(item: ReceiptItemData) {
    this.autocomplete.setText();
    let req = {
      ReceiptId : item.ReceiptId,
      ReceiptItemId : item.ReceiptItemId,
      itemTitle : this.test
    };
    this.sendNewItem.emit(req);
    this.titleRow = null;
    setTimeout(() => {
      this.getReceiptItemData(item.ReceiptId);
    }, 250);
  }

}
