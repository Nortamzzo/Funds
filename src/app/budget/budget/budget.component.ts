import { Component, OnInit } from '@angular/core';
import { Category, CategoryBudget } from '@app/app-models/category-models';
import { Subcategory } from '@app/app-models/subcategory-models';
import { CategoryService } from '@app/app-services/data/category.service';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { NotificationService } from '@app/app-services/notification.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  public categoryData: CategoryBudget[] = [];
  public subcategoryData: Subcategory[] = [];
  public budgetData: any[] = [];
  public content: string = 'budget';
  public currentYear: number = new Date().getFullYear();

  constructor(
    private notService: NotificationService,
    private catService: CategoryService,
    private subService: SubcategoryService
  ) { }

  ngOnInit(): void {
    this.notService.setActiveRoute('budget');
    this.getCategoryData();
    this.getSubcategoryData();
    this.getBudgetData(this.currentYear);
  }

  getCategoryData() {
    this.catService.getCategoryBudgetFull(this.currentYear).subscribe(
      data => {
        this.categoryData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  };

  getSubcategoryData() {
    this.subService.getSubcategoryData().subscribe(
      data => {
        this.subcategoryData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  };

  getBudgetData(year: number) {
    this.subService.getBudgetDataFull(this.currentYear).subscribe(
      data => {
        console.log(data)
        this.budgetData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  }

}
