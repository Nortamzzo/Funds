import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FilterService } from '@app/app-services/filter.service';
import { Category } from 'src/app/app-models/category-models';
import { Subcategory } from 'src/app/app-models/subcategory-models';
import { SubcategoryService } from 'src/app/app-services/data/subcategory.service';
import { NotificationService } from 'src/app/app-services/notification.service';
import { CategoryInputVerticalComponent } from '../category-input-vertical/category-input-vertical.component';

@Component({
  selector: 'app-sidebar-subcategories',
  templateUrl: './sidebar-subcategories.component.html',
  styleUrls: ['./sidebar-subcategories.component.scss']
})
export class SidebarSubcategoriesComponent implements OnInit {
  @ViewChild(CategoryInputVerticalComponent) private input!: CategoryInputVerticalComponent;
  @Input() categoryData: Category[] = [];
  @Input() subcategoryData: Subcategory[] = [];
  public editmode: boolean = false;
  public categoryId: number | null = null;
  public subcategoryId: number | null = null;
  public filtered: boolean = false;
  public addMode: boolean = false;
  public addCatMode: boolean = false;
  public addSubMode: boolean = false;
  public view: string = 'table';
  public selectedCategory: number | null = null;
  public editSubcategory: number | null = null;
  public MonthToDate: boolean = true;

  constructor(
    private subService: SubcategoryService,
    private notif: NotificationService,
    private filter: FilterService
  ) { }

  ngOnInit(): void {
    
  }

  toggleAddCategory() {
    this.addCatMode = !this.addCatMode;
    this.addMode = (this.addCatMode);
    this.view = (this.addMode) ? 'add' : 'table';
    this.addSubMode = false;
    
  }

  toggleAddSubcategory() {
    this.addSubMode = !this.addSubMode;
    this.addMode = (this.addSubMode);
    this.view = (this.addMode) ? 'add' : 'table';
    this.addCatMode = false;
  }

  /**
   * Filters transaction data
   * @param data 
   */
  filterTransactionData(data: any) {
    this.filtered = true;
    this.filter.setSubcategoryId(data);
  }

  /**
   * Gets subcategory data for selected category
   * @param $event 
   */
  getSubcategoryData($event: any) {
    this.notif.sendCategoryId($event.target.value);
    this.notif.sendSubcategoryNotif(true);
  }

  // getSubcategoryData($event: any) {
  //   this.subService.setCategoryId($event.target.value);
  //   this.categoryId = $event.target.value;
  //   this.subService.getSubcategoryData().subscribe(
  //     data => {
  //       this.subcategoryData = JSON.parse(JSON.stringify(data.Value));
  //     }
  //   )
  // };

  /**
   * Resets filter
   */
  resetFilter() {
    this.filtered = false;
    this.filter.resetFilterData();
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