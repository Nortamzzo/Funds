import { Component, OnInit } from '@angular/core';
import { ItemData } from '@app/app-models/item-models';
import { ItemService } from '@app/app-services/data/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  public itemData: ItemData[] = [];

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.getItemData();
  }

  getItemData() {
    this.itemService.getItemData().subscribe(
      data => {
        console.log(data)
        this.itemData = JSON.parse(JSON.stringify(data));
      }
    );
    
  }

}
