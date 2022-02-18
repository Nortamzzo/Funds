import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/app-services/data/account.service';
import { InteractorService } from 'src/app/app-services/interactor.service';

@Component({
  selector: 'app-account-input-vertical',
  templateUrl: './account-input-vertical.component.html',
  styleUrls: ['./account-input-vertical.component.scss']
})
export class AccountInputVerticalComponent implements OnInit {
  @Output() output = new EventEmitter<any>();
  @Input() accountTypes: any[] = [];

  accountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private acct: AccountService,
    private i: InteractorService
  ) { 
    this.accountForm = formBuilder.group({
      Title: ['', Validators.required],
      AccountTypeId: ['', Validators.required],
      StartAmount: [''],
      Information: [''],
      Tracking: [1, Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  interact($event: any) {
    this.i.interactor($event);
  }

  public submit() {
    console.log(this.accountForm);
    this.acct.submitAccount(this.accountForm.value).subscribe();
    this.accountForm.reset();
    this.output.emit(false);
  }

}
