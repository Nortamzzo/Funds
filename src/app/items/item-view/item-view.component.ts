import { Component, Input, OnInit } from '@angular/core';
import { AutoCompleteComponent } from '../../shared/components/auto-complete/auto-complete.component';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  // make Item type
  @Input() public itemData: any[] = [];
  @Input() public itemView: boolean = false;
  // make ItemList type
  public itemList: string[] = [];
  public editItemRow: number | null = null;
  public editItemCol: number | null = null;


  constructor() { }

  ngOnInit(): void {

  }

  addNewItem() {

  }

  cancelEdit() {

  }

  deleteItemById(id: number) {

  }

  setItemEdit(row: number, col: number) {

  }
}
