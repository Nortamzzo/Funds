import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '@app/app-services/data/config.service';
import { Account } from 'src/app/app-models/account-models';
import { FilterService } from 'src/app/app-services/filter.service';
import { InteractorService } from 'src/app/app-services/interactor.service';
import { InterstateService } from 'src/app/app-services/interstate.service';
import { NotificationService } from 'src/app/app-services/notification.service';
import { AccountInputVerticalComponent } from '../account-input-vertical/account-input-vertical.component';

enum BalanceView {
  'Current' = 1,
  'Future'
}

@Component({
  selector: 'app-sidebar-accounts',
  templateUrl: './sidebar-accounts.component.html',
  styleUrls: [
    './sidebar-accounts.component.scss'
  ]
})
export class SidebarAccountsComponent implements OnInit {
  @ViewChild(AccountInputVerticalComponent) private input!: AccountInputVerticalComponent;
  @Input() accountData: Account[] = [];
  @Input() accountTypeData: any[] = [];
  @Input() total: number = 0;
  public account: any[] = [];
  public addMode: boolean = false;
  public editmode: boolean = false;
  public mode: string = 'view';
  public class: string = 'viewMode';
  public editMode: boolean = false;
  public editAccount: any[] = [];
  public toggleUntracked: boolean = false;
  public filtered: boolean = false;
  public balanceView: string = 'current';
  public selectedAccount: number | null = null;

  constructor(
    private i: InteractorService,
    private state: InterstateService,
    private notif: NotificationService,
    private filter: FilterService,
    private conService: ConfigService
  ) { }

  ngOnInit(): void {
  }

  isEmptyObject(obj: {}) {
    return (obj && (Object.keys(obj).length === 0));
  }

  interact($event: any) {
    this.i.interactor($event);
  }

  toggleAddMode() {
    this.addMode = !this.addMode;
  }

  toggleViewMode() {
    this.mode = 'view';
    this.class = 'viewMode';
  }

  submit() {
    this.input.submit();
  }

  resetFilter() {
    if (this.filtered) {
      this.filter.resetFilterData();
      this.notif.sendTransNotif(true);
      this.filtered = false;
    }
  }

  filterTransactionData(account: any) {
    this.filter.setAccountId(account);
    this.notif.sendTransNotif(true);
    this.filtered = true;
  }

  edit(data: Account) {
    console.log(data)
  }

  handleOutput($event: any) {
    console.log($event);
  }

  toggleAccountBalance() {
    this.balanceView = (this.balanceView === 'current') ? 'future' : 'current';
  }

  selectAccount(acct: number) {
    this.selectedAccount = (this.selectedAccount === acct) ? null : acct;
  }

}
