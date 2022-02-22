import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ItemData } from '@app/app-models/item-models';
import { ReceiptData, ReceiptItemData } from '@app/app-models/receipt-models';
import { ItemService } from '@app/app-services/data/item.service';

import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-receipt-view',
  templateUrl: './receipt-view.component.html',
  styleUrls: ['./receipt-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReceiptViewComponent implements OnInit {
  @Output() private newBlankReceiptItem = new EventEmitter<any>();
  @Input() public receiptView: boolean = false;
  @Input() public receiptData: ReceiptData[] = [];
  @Input() public receiptItemData: ReceiptItemData[] = [];
  @Input() public itemData: ItemData[] = [];
  @Input() public itemList!: string[];
  public model: any;
  public titleRow: number | null = null;
  public quantityRow: number | null = null;
  public amountRow: number | null = null;
  public informationRow: number | null = null;
  public editTaxMode: boolean = false;
  private resultOptionsSubject: Subject<any> = new Subject<any>();

  constructor(
    private itemService: ItemService,
    private ta: NgbTypeaheadConfig
  ) {
    ta.showHint = true;
    if (this.receiptView) {
      console.log(this.receiptData)
    }
  }

  ngOnInit(): void {

  }

  insertNewItem() {
    this.newBlankReceiptItem.emit(true);
  }

  editTitle(row: number) {
    this.titleRow = row;
  }

  editTitleValue($event: any) {
    console.log($event.target.value)
  }

  editQuantity(row: number) {
    this.quantityRow = row;
  }

  editAmount(row: number) {
    this.amountRow = row;
  }

  editAmountValue($event: any) {
    console.log($event.target.value)
  }

  editInformation(row: number) {
    this.informationRow = row;
  }

  editTax() {
    console.log('toggle')
    this.editTaxMode = !this.editTaxMode;
  }

  /**
   * Filters Items by text value
   * @param text$ 
   * @returns ItemTitle list
   */
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((text) => this.itemService.searchItems(text)),
    )

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? []
  //       : this.itemList.filter(itemList => itemList.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
  //   )

  

}
