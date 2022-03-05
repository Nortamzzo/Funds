import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/app-services/data/category.service';

@Component({
  selector: 'app-category-input-vertical',
  templateUrl: './category-input-vertical.component.html',
  styleUrls: ['./category-input-vertical.component.scss']
})
export class CategoryInputVerticalComponent implements OnInit {
  @Output() output = new EventEmitter<any>();
  @Output() sendAction = new EventEmitter<any>();
  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cat: CategoryService
  ) {
    this.categoryForm = formBuilder.group({
      Title: ['', Validators.required],
      Information: ['', Validators.required],
      FlowId: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  public submit() {
    this.cat.submitCategory(this.categoryForm.value).subscribe();
    this.categoryForm.reset();
    this.output.emit(false);
    this.sendAction.emit('clear');
  }

}
