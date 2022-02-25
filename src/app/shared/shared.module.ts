import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortDirective } from './app-directives/sort.directive';
import { MaterialModule } from '@app/mat/material/material.module';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';



@NgModule({
  declarations: [
    SortDirective,
    AutoCompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    SortDirective,
    AutoCompleteComponent
  ]
})
export class SharedModule { }
