import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Account } from '@app/app-models/account-models';
import { Category } from '@app/app-models/category-models';
import { PresetList, PresetTransaction } from '@app/app-models/preset-transaction-model';
import { Subcategory } from '@app/app-models/subcategory-models';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { NotificationService } from '@app/app-services/notification.service';

@Component({
  selector: 'app-sidebar-transactions',
  templateUrl: './sidebar-transactions.component.html',
  styleUrls: ['./sidebar-transactions.component.scss']
})
export class SidebarTransactionsComponent implements OnInit {
  @Input() public accountData: Account[] = [];
  @Input() public accountTypeData: any[] = [];
  @Input() public categoryData: Category[] = [];
  @Input() public subcategoryData: Subcategory[] = [];
  @Input() public locationData: Location[] = [];
  @Input() public presetData: PresetTransaction[] = []
  @Input() public total: number = 0;
  public viewMode: string | null = 'accounts';

  constructor(
    private notif: NotificationService,
    private subService: SubcategoryService
  ) {
    this.notif.getSubcategoryNotif().subscribe(
      data => {
        if (data) {
          this.getSubcategoryData();
        }
      }
    );
   }

  ngOnInit(): void {
  }

  setView(data: string) {
    this.viewMode = (this.viewMode === data) ? null : data;
  }

  getSubcategoryData() {
    this.subService.getSubcategoryData().subscribe(
      data => {
        this.subcategoryData = JSON.parse(JSON.stringify(data.Value));
        console.log(this.subcategoryData)
      }
    )
  };

}
