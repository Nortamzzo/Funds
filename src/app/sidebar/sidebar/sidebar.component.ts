import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CfgSidebarView } from '@app/app-models/config.models';
import { PresetTransaction } from '@app/app-models/preset-transaction-model';
import { SidebarView } from '@app/app-models/sidebar.models';
import { CategoryService } from '@app/app-services/data/category.service';
import { ConfigService } from '@app/app-services/data/config.service';
import { LocationService } from '@app/app-services/data/location.service';
import { PresetTransactionService } from '@app/app-services/data/preset-transaction.service';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { TransactionService } from '@app/app-services/data/transaction.service';
import { UserConfigService } from '@app/app-services/data/user-config.service';
import { NotificationService } from '@app/app-services/notification.service';
import { Account } from 'src/app/app-models/account-models';
import { Category } from 'src/app/app-models/category-models';
import { Subcategory } from 'src/app/app-models/subcategory-models';
import { ComponentStyleService } from 'src/app/app-services/component-style.service';
import { AccountService } from 'src/app/app-services/data/account.service';
import { AccountInputVerticalComponent } from '../account-input-vertical/account-input-vertical.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild(AccountInputVerticalComponent) private input!: AccountInputVerticalComponent;
  public sidebarViews: CfgSidebarView[] = [];
  public presetData: PresetTransaction[] = [];
  public accountData: Account[] = [];
  public accountTypeData: any[] = [];
  public categoryData: Category[] = [];
  public subcategoryData: Subcategory[] = [];
  public locationData: Location[] = [];
  public userConfigData: any = [];
  public yearList!: number[];
  // TODO: sidebarConfig type
  public sidebarConfig: any[] = [];
  public content: string | null = null;
  public viewMode: string | null = 'Accounts';
  public total: number = 0;

  constructor(
    public cs: ComponentStyleService,
    private notif: NotificationService,
    private cat: CategoryService,
    private sub: SubcategoryService,
    private acct: AccountService,
    private loc: LocationService,
    private preService: PresetTransactionService,
    private conService: ConfigService,
    private transService: TransactionService,
    private ucService: UserConfigService
  ) {
    this.notif.getTransNotif().subscribe(
      data => {
        if (data) {
          this.getCategoryData();
          this.getAccountData();
        }
      }
    )
    this.notif.getActiveRoute().subscribe(
      data => {
        this.content = data;
      }
    );
    this.notif.getAccountNotif().subscribe(
      data => {
        if (data) {
          this.getAccountData();
        }
      }
    );
    this.notif.getCategoryNotif().subscribe(
      data => {
        if (data) {
          this.getCategoryData();
        }
      }
    );
    this.notif.getSubcategoryNotif().subscribe(
      data => {
        if (data) {
          this.getSubcategoryData();
        }
      }
    );
    this.notif.getUserConfigNotif().subscribe(
      data => {
        if (data) {
          this.getSubcategoryData();
        }
      }
    );
   }

  ngOnInit(): void {
    this.getSidebarViews();
    this.getAccountData();
    this.getCategoryData();
    this.getSubcategoryData();
    this.getLocationData();
    this.getPresetData();
    this.getAccountTypeData();
    this.getYearList();
    this.getUserConfigData();
    // Disabled until sidebar selection rework
    // this.getSidebarViews();
    // setTimeout(() => {
    //   this.viewMode = (this.userConfigData[0].SidebarSelection) ? this.userConfigData[0].SidebarSelection : 'accounts';
    // }, 500);
  }

  getUserConfigData() {
    this.conService.getUserConfigData().subscribe(
      data => {
        this.userConfigData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  }

  getAccountData() {
    let AccountId = 0;
    this.acct.getAccountData(AccountId).subscribe(
      data => {
        this.accountData = JSON.parse(JSON.stringify(data));
      }
    )
  };

  getAccountTypeData() {
    this.acct.getAccountTypeData().subscribe(
      data => {
        this.accountTypeData = data;
      }
    )
  };

  getCategoryData(request?: number) {
    this.cat.getCategoryData(request).subscribe(
      data => {
        this.categoryData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  };

  getSubcategoryData() {
    this.sub.getSubcategoryData().subscribe(
      data => {
        this.subcategoryData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  };

  getLocationData() {
    this.loc.getLocationList().subscribe(
      data => {
        this.locationData = JSON.parse(JSON.stringify(data));
      }
    )
  }

  getPresetData() {
    this.preService.getPresetTransactionData().subscribe(
      data => {
        this.presetData = JSON.parse(JSON.stringify(data));
      }
    )
  }

  getYearList() {
    this.transService.getDateRange().subscribe(
      data => {
        this.yearList = JSON.parse(JSON.stringify(data));
      }
    )
  }

  /**
   * Populate sidebar topic buttons with sidebar view data
   */
  getSidebarViews() {
    this.conService.getUserConfigSidebarViews().subscribe(
      data => {
        this.sidebarViews = data.Value;
      }
    )
  }

  /**
   * Sets sidebar view selection in db
   * @param $event Sidebar selection
   */
  setSidebarView($event: any) {
    this.viewMode = $event.target.value;
    // Disabled: rework
    // this.conService.setSidebarSelection($event.target.value).subscribe();
  }

  submit() {
    this.input.submit();
  }

  /**
   * sets sidebar view
   * @param data string = sidebar view
   */
  getView(data: string) {
    this.viewMode = data;
  }

}
