import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTitleAutoCompleteComponent } from './item-title-auto-complete.component';

describe('ItemTitleAutoCompleteComponent', () => {
  let component: ItemTitleAutoCompleteComponent;
  let fixture: ComponentFixture<ItemTitleAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTitleAutoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTitleAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
