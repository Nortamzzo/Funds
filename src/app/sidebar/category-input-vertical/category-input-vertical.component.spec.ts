import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryInputVerticalComponent } from './category-input-vertical.component';

describe('CategoryInputVerticalComponent', () => {
  let component: CategoryInputVerticalComponent;
  let fixture: ComponentFixture<CategoryInputVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryInputVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryInputVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
