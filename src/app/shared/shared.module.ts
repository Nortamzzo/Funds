import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { SortDirective } from './app-directives/sort.directive';



@NgModule({
  declarations: [
    InputTextComponent,
    SortDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputTextComponent,
    SortDirective
  ]
})
export class SharedModule { }
