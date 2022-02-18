import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPresetTransactionsComponent } from './preset-transactions.component';

describe('PresetTransactionsComponent', () => {
  let component: SidebarPresetTransactionsComponent;
  let fixture: ComponentFixture<SidebarPresetTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPresetTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPresetTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
