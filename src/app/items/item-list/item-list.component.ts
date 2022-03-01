import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '@app/app-services/data/item.service';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() itemData: any[] = [];
  public newItemMode: boolean = false;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
  }

  addNewItem() {
    this.newItemMode = !this.newItemMode;
  }

  getItemData() {
    // this.itemService.
  }

  receiveAddItem($event: any) {
    if ($event) {
      this.newItemMode = false;
    }
  }

  setViewId(item: number) {

  }

}
