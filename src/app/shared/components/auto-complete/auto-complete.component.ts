import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

export interface AutoList {
  Id: number;
  Title: string;
}

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  // New output: text only
  @Output() public output = new EventEmitter<any>();
  // Output selected option
  @Output() public optionOutput = new EventEmitter<any>();
  // Output new text
  @Output() public textOutput = new EventEmitter<any>();
  // List to populate dropdown
  @Input() public list: AutoList[] = [];
  @Input() public idKey: string = 'ItemId';
  @Input() public value: any;
  // If passing in an object from ngfor, index
  @Input() public row?: number;
  // If passing in an object from ngfor, iteration
  @Input() public object: any;
  // Optional placeholder to display
  @Input() public placeholder: string;
  // List filtered with current input
  public filteredOptions: Observable<any[]>;
  public autoControl = new FormControl();

  constructor() {
    this.filteredOptions = this.autoControl.valueChanges
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
    setTimeout(() => {
      this.filteredOptions = this.autoControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    }, 350);
  }

  private _filter(value: any): any[] {
    // const filterValue = value.Title.toLowerCase();
    // return this.list.filter(option => option.Title.toLowerCase().includes(filterValue));
    let filterValue = '';
    if (typeof value === "string") {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.Title.toLowerCase();
    };

    return this.list.filter(
      option => option.Title.toLowerCase().indexOf(filterValue) === 0
    );
  }

  /**
   * Filters value in input box from list
   * @param val 
   * @returns filtered list
   */
  filter(val: any): Observable<any[]> {
    return this.filteredOptions.pipe(
      map(response => response.filter(option => {
        return option.toLowerCase().indexOf(val.toLowerCase()) === 0
      }))
    )
  }

  handleAutoComplete(value: any) {
    let exist: boolean = false;
    if (this.list.includes(value)) {
      exist = true;
    };
    let data = {
      value: value,
      exist: exist
    };
    this.output.emit(data);
    setTimeout(() => {
      // this.autoControl.reset();
    }, 250);

  }

  getOptionText(option: any) {
    let result = (this.value) ? option : 'set'
    return option;
  }

  /**
   * Emits selected option from dropdown
   * @param $event $event.target / $event.option
   */
  sendOption($event: any) {
    console.log($event.value)
    this.optionOutput.emit($event.value);
  }

  /**
   * Emits text from input
   * Used to select option that is not in list, i.e. create new
   * @param $event value
   */
  sendText() {
    console.log()
    // this.textOutput.emit(this.value);
  }

}
