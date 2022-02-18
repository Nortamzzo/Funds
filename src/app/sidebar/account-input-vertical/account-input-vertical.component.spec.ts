import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInputVerticalComponent } from './account-input-vertical.component';

describe('AccountInputVerticalComponent', () => {
  let component: AccountInputVerticalComponent;
  let fixture: ComponentFixture<AccountInputVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountInputVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInputVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
