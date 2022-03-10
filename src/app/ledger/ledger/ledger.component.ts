import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from '@app/app-models/account-models';
import { Category } from '@app/app-models/category-models';
import { Location } from '@app/app-models/location.models';
import { Subcategory } from '@app/app-models/subcategory-models';
import { Transaction, TransactionFilter } from '@app/app-models/transaction-models';
import { AppService } from '@app/app-services/app.service';
import { AccountService } from '@app/app-services/data/account.service';
import { CategoryService } from '@app/app-services/data/category.service';
import { LocationService } from '@app/app-services/data/location.service';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { TransactionService } from '@app/app-services/data/transaction.service';
import { NotificationService } from '@app/app-services/notification.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {
  public content: string = 'ledger';
  public filterData!: TransactionFilter;
  public transactionData: Transaction[] = [];
  public accountData: Account[] = [];
  public categoryData: Category[] = [];
  public subcategoryData: Subcategory[] = [];
  public locationData: Location[] = [];
  public total: number = 0;
  public columns: any = [
    {
      name: "DateOf",
      width: '10%',
      type: 'date'
    },
    {
      name: 'AccountName',
      width: '10%',
      type: 'select',
      value: 'value'
    },
    {
      name: 'Location',
      width: '10%',
      type: 'text'
    },
    {
      name: 'CategoryName',
      width: '10%',
      type: 'select',
      value: 'value'
    },
    {
      name: 'SubcategoryName',
      width: '10%',
      type: 'select',
      value: 'value'
    },
    {
      name: 'Information',
      width: '10%',
      type: 'text'
    },
    {
      name: 'Amount',
      width: '10%',
      type: 'currency'
    },
    {
      name: 'Balance',
      width: '10%',
      type: 'currency'
    },
    {
      name: 'Actions',
      width: '10%',
      type: 'date'
    }
  ]

  constructor(
    private http: HttpClient,
    private transService: TransactionService,
    private acctService: AccountService,
    private catService: CategoryService,
    private subService: SubcategoryService,
    private locService: LocationService,
    private notService: NotificationService
  ) {
    this.notService.getTransNotif().subscribe(
      data => {
        if (data) {
          this.getTransactionData();
        }
      }
    );
   }

  ngOnInit(): void {
    this.notService.setActiveRoute('ledger');
    this.getTransactionData();
    this.getAccountData();
    this.getCategoryData();
    this.getLocationData();
    this.getSubcategoryData();
  }

  getTransactionData() {
    this.transService.getTransactionData().subscribe(
      data => {
        this.transactionData = JSON.parse(JSON.stringify(data.Value));
        let subtotal = 0;
        for (let i = 0; i < this.transactionData.length; i++) {
          subtotal += Number(this.transactionData[i].Amount);
        }
        this.total = subtotal;
      }
    )
  };

  getDateRange() {

  }

  getAccountData() {
    let AccountId = 0;
    this.acctService.getAccountData(AccountId).subscribe(
      data => {
        this.accountData = JSON.parse(JSON.stringify(data));
      }
    )
  };

  getLocationData() {
    this.locService.getLocationData().subscribe(
      data => {
        this.locationData = JSON.parse(JSON.stringify(data));
      }
    )
  }

  getLocationList() {
    this.locService.getLocationList().subscribe(
      data => {
        this.locationData = JSON.parse(JSON.stringify(data));
      }
    )
  }

  getCategoryData(request?: number) {
    this.catService.getCategoryData(request).subscribe(
      data => {
        this.categoryData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  };

  getSubcategoryData() {
    this.subService.getSubcategoryData().subscribe(
      data => {
        this.subcategoryData = JSON.parse(JSON.stringify(data.Value));
      }
    )
  };

  updateTransaction(data: any) {
    this.transService.updateTransaction(data).subscribe();
    setTimeout(() => {
      this.getTransactionData();
    }, 150
    )
    
  }
  

  deleteTransaction(data: number) {
    console.log(data)
    this.transService.disableTransaction(data).subscribe();
  }


}
