import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '@app/app-models/account-models';
import { Category } from '@app/app-models/category-models';
import { Subcategory } from '@app/app-models/subcategory-models';
import { AccountService } from '@app/app-services/data/account.service';
import { CategoryService } from '@app/app-services/data/category.service';
import { LocationService } from '@app/app-services/data/location.service';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { TransactionService } from '@app/app-services/data/transaction.service';
import { InteractorService } from '@app/app-services/interactor.service';
import { NotificationService } from '@app/app-services/notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-transaction-modal',
  templateUrl: './new-transaction-modal.component.html',
  styleUrls: ['./new-transaction-modal.component.scss']
})
export class NewTransactionModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() body: string = '';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  public accountData: Account[] = [];
  @Input() categoryData: Category[] = [];
  @Input() subcategoryData: Subcategory[] = [];
  @Input() locationData: any[] = [];
  public locationList: any[] = [];

  @Input() my_modal_title: string;
  @Input() my_modal_content: any;

  public transactionForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private i: InteractorService,
    private subService: SubcategoryService,
    private accountSerivce: AccountService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private locationService: LocationService,
    private tra: TransactionService,
    private locService: LocationService,
    private notif: NotificationService
  ) {
    this.transactionForm = formBuilder.group({
      DateOf: ['', Validators.required],
      AccountId: ['', Validators.compose([Validators.required, Validators.min(1)])],
      CategoryId: [''],
      SubcategoryId: [''],
      Information: [''],
      Amount: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getAccountData();
    this.getCategoryData();
    this.getLocationList();
  }

  /**
   * Gets account data
   */
  getAccountData() {
    let AccountId = 0;
    this.accountSerivce.getAccountData(AccountId).subscribe(
      data => {
        this.accountData = JSON.parse(JSON.stringify(data));
      }
    )
  };

   /**
   * Gets category data
   */
    getCategoryData() {
      this.categoryService.getCategoryData().subscribe(
        data => {
          this.categoryData = data.Value;
        }
      )
    }

    /**
     * Gets subcategory data for category id
     * @param $event 
     */
  getSubcategoryData($event: any) {
    this.notif.sendCategoryId($event.target.value);
    this.notif.sendSubcategoryNotif(true);
  }

  getSubcategoryDataById($event: any) {
    this.subService.getSubcategoryDataByCatId($event.target.value).subscribe(
      data => {
        console.log(data.Value)
        this.subcategoryData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  }

  /**
   * Gets location list
   */
  getLocationList() {
    this.locService.getLocationList().subscribe(
      data => {
        this.locationList = data;
      }
    )
  }

  /**
   * Cancels transaction input, clearing inputs
   */
   cancelTransaction() {
    this.transactionForm.reset();
    let mode = 'transaction';
    // this.i.transactionInput(mode);
  }

  /**
   * Inserts transaction to db via sproc
   */
   public submitTransaction() {
    this.tra.submitTransaction(this.transactionForm.value).subscribe();
    this.transactionForm.reset();
  }

}
