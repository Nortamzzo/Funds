import { Component, Input, OnInit } from '@angular/core';
import { Category, CategoryBudget } from '@app/app-models/category-models';
import { Subcategory } from '@app/app-models/subcategory-models';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { NotificationService } from '@app/app-services/notification.service';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit {
  @Input() public categoryData: CategoryBudget[] = [];
  @Input() public subcategoryData: Subcategory[] = [];
  @Input() public budgetData: any[] = [];
  public editmode: boolean = false;
  public categoryId: number | null = null;
  public subcategoryId: number | null = null;
  public filtered: boolean = false;
  public addmode: boolean = false;
  public sbSubView: string = 'table';
  public selectedCategory: number | null = null;
  public editSubcategory: number | null = null;
  public MonthToDate: boolean = true;

  constructor(
    private notif: NotificationService,
    private subService: SubcategoryService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Sets category for getSubcategoryData
   * if category is same as selected, set to null
   * @param cat 
   */
   selectCategory(cat: number) {
    if (this.selectedCategory === cat) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = cat;
    }
    this.notif.sendCategoryId(cat);
    this.notif.sendSubcategoryNotif(true);
  }

  /**
   * Switches td to input, updates budget
   * @param sub 
   */
   editBudget(sub: number) {
    this.editSubcategory = sub;
  }

  /**
   * Updates subcategory budget
   * @param $event
   */
  updateBudget($event: any, sub: number) {
    let req = {
      SubcategoryId : sub,
      UpdateValue : $event.target.value
    }
    this.subService.updateSubcategoryBudget(req).subscribe();
    this.editSubcategory = null;
  }


}
