import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  @Output() optionOutput = new EventEmitter<any>();
  @Output() textOutput = new EventEmitter<any>();
  @Input() list: string[] = [];
  @Input() row!: number;
  @Input() object: any;
  public filteredOptions: Observable<string[]>;
  public myControl = new FormControl();

  @Input() public value: any;

  constructor() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val || '')
        })
      );
   }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.list.filter(option => option.toLowerCase().includes(filterValue));
  }

  filter(val: string): Observable<any[]> {
    return this.filteredOptions.pipe(
        map(response => response.filter(option => {
          return option.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  setText() {
    this.textOutput.emit(this.value);
  }

  selectOption($event: any) {
    this.optionOutput.emit($event);
  }

}
