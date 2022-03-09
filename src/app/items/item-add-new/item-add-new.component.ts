import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '@app/items/item.service';

@Component({
  selector: 'app-item-add-new',
  templateUrl: './item-add-new.component.html',
  styleUrls: ['./item-add-new.component.scss']
})
export class ItemAddNewComponent implements OnInit {
  @Output() sendAddItem = new EventEmitter<any>();
  public title!: string;
  public info!: string;
  public itemForm: FormGroup;

  constructor(
    private itemService: ItemService,
    private FormBuilder: FormBuilder
  ) {
    this.itemForm = FormBuilder.group({
      Title: ['', Validators.required],
      Information: ['']
    })
   }

  ngOnInit(): void {
  }

  public submitNewItem() {
    this.itemService.addNewItem(this.itemForm.value).subscribe(
      data => {
        if (data) {
          console.log(data)
        }
      }
    );
    this.itemForm.reset();
    this.sendAddItem.emit(true);
  }

}
