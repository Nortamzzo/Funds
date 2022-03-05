import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortDirective } from './app-directives/sort.directive';
import { MaterialModule } from '@app/mat/material/material.module';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';



@NgModule({
  declarations: [
    SortDirective,
    AutoCompleteComponent,
    InputAutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    SortDirective,
    AutoCompleteComponent,
    InputAutocompleteComponent,
    MaterialModule
  ]
})
export class SharedModule { }
