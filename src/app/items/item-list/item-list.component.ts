import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() itemData: any[] = [];
  public newItemMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addNewItem() {
    this.newItemMode = !this.newItemMode;
  }

  receiveAddItem($event: any) {
    if ($event) {
      this.newItemMode = false;
    }
  }

  setViewId(item: number) {

  }

}
