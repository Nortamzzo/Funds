import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@app/app-models/category-models';
import { SubcategoryService } from 'src/app/app-services/data/subcategory.service';

@Component({
  selector: 'app-subcategory-input-vertical',
  templateUrl: './subcategory-input-vertical.component.html',
  styleUrls: ['./subcategory-input-vertical.component.scss']
})
export class SubcategoryInputVerticalComponent implements OnInit {
  @Output() output = new EventEmitter<any>();
  @Output() sendAction = new EventEmitter<any>();
  @Input() categoryData: Category[] = [];

  subcategoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sub: SubcategoryService
  ) {
    this.subcategoryForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Information: ['', Validators.required],
      CategoryId: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  public enterSubcategory() {
    this.sub.submitSubcategory(this.subcategoryForm.value).subscribe();
    this.subcategoryForm.reset();
    this.output.emit(false);
    this.sendAction.emit('clear')
  }

}
