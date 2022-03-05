import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

import { Account } from '@app/app-models/account-models';
import { Category } from '@app/app-models/category-models';
import { Subcategory } from '@app/app-models/subcategory-models';
import { LocationService } from '@app/app-services/data/location.service';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { TransactionService } from '@app/app-services/data/transaction.service';
import { InteractorService } from '@app/app-services/interactor.service';
import { NotificationService } from '@app/app-services/notification.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AutoCompleteComponent } from '../../shared/components/auto-complete/auto-complete.component';

@Component({
  selector: 'app-sidebar-transaction-input',
  templateUrl: './sidebar-transaction-input.component.html',
  styleUrls: ['./sidebar-transaction-input.component.scss']
})
export class SidebarTransactionInputComponent implements OnInit {
  @ViewChild (AutoCompleteComponent) autocomplete: AutoCompleteComponent;
  @Output() output = new EventEmitter<any>();
  @Input() accountData: Account[] = [];
  @Input() categoryData: Category[] = [];
  @Input() subcategoryData: Subcategory[] = [];
  @Input() locationData: any[] = [];
  // TODO: Location list type
  public locationList: any[] = [];
  public transactionForm: FormGroup;
  public LocationValue: any;

  public filteredLocationOptions: Observable<string[]>;
  public myControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private i: InteractorService,
    private sub: SubcategoryService,
    private tra: TransactionService,
    private locService: LocationService,
    private notif: NotificationService,
    ta: NgbTypeaheadConfig
  ) {
    this.transactionForm = formBuilder.group({
      DateOf: ['', Validators.required],
      AccountId: ['', Validators.compose([Validators.required, Validators.min(1)])],
      CategoryId: [''],
      SubcategoryId: [''],
      Information: [''],
      Amount: ['', Validators.required]
    })
    ta.showHint = true;
  }

  ngOnInit(): void {
    this.getLocationList();
  }
  
  /**
   * Gets subcategory data
   * @param $event value: CategoryId
   */
  getSubcategoryData($event: any) {
    this.notif.sendCategoryId($event.target.value);
    this.notif.sendSubcategoryNotif(true);
  }

  getLocationList() {
    this.locService.getLocationList().subscribe(
      data => {
        this.locationList = data;
      }
    )
  }

  /**
   * Inserts transaction to db via sproc
   */
  public submitTransaction() {
    this.tra.submitTransaction(this.transactionForm.value).subscribe();
    this.transactionForm.reset();
  }

  /**
   * Cancels transaction input, clearing inputs
   */
  cancelTransaction() {
    this.transactionForm.reset();
    let mode = 'transaction';
    // this.i.transactionInput(mode);
  }

  getOptionText(option: any) {
    return option;
  }

   /**
   * Removes everything from location data except Title
   * @param value Location Data
   * @returns Location Title Array
   */
  resultFormatLocation(value: any) {
    return value.name;
  }

  /**
   * Filters location list by value
   * @param value 
   * @returns 
   */
  inputFormatLocation(value: any) {
    if (value.name)
      return value.name
    return value;
  }

  test() {
    console.log("Test: ", this.transactionForm.controls['Location'].value)
    // this.transactionForm.controls['Location'].setValue(this.transactionForm.controls['Location'].value)
    console.log("test: ", this.transactionForm.value)
  }

  test2($event: any) {
    console.log("Test 2: ", $event.target.value)
  }

  receiveLocationOption($event: any) {
    this.transactionForm.addControl('Location', new FormControl('', Validators.required));
    this.transactionForm.controls['Location'].setValue($event);
  }

  receiveLocationText() {

  }


}