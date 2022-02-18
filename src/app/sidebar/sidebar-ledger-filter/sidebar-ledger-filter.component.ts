import { Component, Input, OnInit } from '@angular/core';
import { Account } from '@app/app-models/account-models';
import { Category } from '@app/app-models/category-models';
import { Subcategory } from '@app/app-models/subcategory-models';
import { LocationService } from '@app/app-services/data/location.service';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { FilterService } from '@app/app-services/filter.service';
import { NotificationService } from '@app/app-services/notification.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-ledger-filter',
  templateUrl: './sidebar-ledger-filter.component.html',
  styleUrls: ['./sidebar-ledger-filter.component.scss']
})
export class SidebarLedgerFilterComponent implements OnInit {
  @Input() public accountData: Account[] = [];
  @Input() public categoryData: Category[] = [];
  @Input() public subcategoryData: Subcategory[] = [];
  @Input() public locationData: any[] = [];

  // filter variables
  public dateof: Date | null = null;
  public datemin: Date | null = null;
  public datemax: Date | null = null;
  public datemonth: string | null = null;
  public dateyear: number | null = null;
  public accountid: number | null = null;
  public location: string | null = null;
  public categoryid: number | null = null;
  public subcategoryid: number | null = null;
  public information: string | null = null;

  constructor(
    private sub: SubcategoryService,
    private locService: LocationService,
    private filService: FilterService,
    private notService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  getSubcategoryData($event: any) {
    this.notService.sendCategoryId($event.target.value);
    this.sub.getSubcategoryData().subscribe(
      data => {
        this.subcategoryData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  };

  updateDateof($event: any) {
    this.filService.setDateOf($event.target.value);
  }
  resetDateof() {
    this.dateof = null
    this.filService.resetDateOf();
  }

  updateDatemin($event: any) {
    this.filService.setDateMin($event.target.value);

  }
  resetDatemin() {
    this.datemin = null;
    this.filService.resetDateMin();
  }

  updateDatemax($event: any) {
    this.filService.setDateMax($event.target.value);
  }
  resetDatemax() {
    this.datemax = null;
    this.filService.resetDateMax();
  }

  updateDatemonth($event: any) {
    this.datemonth = $event.target.value;
    this.filService.setDateMonth($event.target.value);
  }
  resetDatemonth() {
    this.datemonth = null;
    this.filService.resetDateMonth();
  }

  updateDateyear($event: any) {
    this.filService.setDateYear($event.target.value);
  }
  resetDateyear() {
    this.dateyear = null;
    this.filService.resetDateYear();
  }

  updateAccountid($event: any) {
    this.accountid = $event.target.value;
    this.filService.setAccountId($event.target.value);
  }
  resetAccountid() {
    this.accountid = null;
    this.filService.resetAccountId();
  }

  updateLocation($event: any) {
    this.location = $event.target.value;
    this.filService.setLocation($event.target.value);
  }
  resetLocation() {
    this.location = null;
    this.filService.resetLocation();
  }

  updateCategoryId($event: any) {
    this.categoryid = $event.target.value;
    this.filService.setCategoryId($event.target.value);
  }
  resetCategoryid() {
    this.categoryid = null;
    this.subcategoryid = null;
    this.filService.resetCategoryId();
  }

  updateSubcategoryId($event: any) {
    this.subcategoryid = $event.target.value;
    this.filService.setSubcategoryId($event.target.value);
  }
  resetSubcategoryid() {
    this.subcategoryid = null;
    this.filService.resetSubcategoryId();
  }

  detectInformation() {
    let text = this.information;
    setTimeout(() => {
      if (text == this.information) {
        if (this.information) {
          this.updateInformation(this.information)
        }
      }
    }, 500);
  }

  updateInformation(value: string) {
    this.filService.setInformation(value);
  }
  resetInformation() {
    this.information = null;
    this.filService.resetInformation();
  }

  getLocations() {
    this.locService.getLocationList().subscribe(
      data => {
        console.log(data)
        this.locationData = data;
      }
    )
  }
 
}
