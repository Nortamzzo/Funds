import { Component, Input, OnInit } from '@angular/core';
import { Account } from '@app/app-models/account-models';
import { Category } from '@app/app-models/category-models';
import { PresetTransaction } from '@app/app-models/preset-transaction-model';
import { Subcategory } from '@app/app-models/subcategory-models';

@Component({
  selector: 'app-sidebar-preset-transactions',
  templateUrl: './preset-transactions.component.html',
  styleUrls: ['./preset-transactions.component.scss']
})
export class SidebarPresetTransactionsComponent implements OnInit {
  @Input() public presetData: PresetTransaction[] = []
  @Input() public accountData: Account[] = [];
  @Input() public categoryData: Category[] = [];
  @Input() public subcategoryData: Subcategory[] = [];
  @Input() public locationData: Location[] = [];
  public editPresetTrans: number | null = null;
  public editDateCell: number | null = null;
  public showOverviewCell: number | null = null;
  public addmode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param id 
   */
  showOverview(id: number) {
    if (this.showOverviewCell === id) {
      this.showOverviewCell = null;
    } else {
      this.showOverviewCell = id;
    }
    this.editDateCell = null;
    this.editPresetTrans = null;
  }

  /**
   * 
   * @param id 
   */
  editDate(id: number) {
    this.editDateCell = id;
  }

  /**
   * 
   * @param id 
   */
  editPreset(id: number) {
    this.editPresetTrans = id;
    this.showOverviewCell = null;
  }

  /**
   * 
   * @param row 
   */
  updatePreset(row: any) {
    console.log(row)
  }

  /**
   * 
   */
  cancelEdit() {
    this.editPresetTrans = null;
  }

}
