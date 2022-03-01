import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAddNewComponent } from './item-add-new.component';

describe('ItemAddNewComponent', () => {
  let component: ItemAddNewComponent;
  let fixture: ComponentFixture<ItemAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAddNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
