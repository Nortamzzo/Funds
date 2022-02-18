import { Component, Input, OnInit } from '@angular/core';
import { Account } from '@app/app-models/account-models';
import { Category } from '@app/app-models/category-models';
import { PresetTransaction } from '@app/app-models/preset-transaction-model';
import { Subcategory } from '@app/app-models/subcategory-models';

@Component({
  selector: 'app-sidebar-budget',
  templateUrl: './sidebar-budget.component.html',
  styleUrls: ['./sidebar-budget.component.scss']
})
export class SidebarBudgetComponent implements OnInit {
  @Input() public accountData: Account[] = [];
  @Input() public accountTypeData: any[] = [];
  @Input() public categoryData: Category[] = [];
  @Input() public subcategoryData: Subcategory[] = [];
  @Input() public locationData: Location[] = [];
  @Input() public presetData: PresetTransaction[] = []
  @Input() public total: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
