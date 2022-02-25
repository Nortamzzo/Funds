import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { MaterialModule } from '@app/mat/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { ItemAddNewComponent } from './item-add-new/item-add-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemListComponent,
    ItemViewComponent,
    ItemAddNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    ItemsComponent
  ]
})
export class ItemsModule { }
