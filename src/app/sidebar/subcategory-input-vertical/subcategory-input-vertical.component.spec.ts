import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryInputVerticalComponent } from './subcategory-input-vertical.component';

describe('SubcategoryInputVerticalComponent', () => {
  let component: SubcategoryInputVerticalComponent;
  let fixture: ComponentFixture<SubcategoryInputVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryInputVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryInputVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
