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
  /**
   * Output selected option
   * @output $event.value
   */
  @Output() public optionOutput = new EventEmitter<any>();
  /**
   * Output new text entry
   */
  @Output() public textOutput = new EventEmitter<any>();
  /**
   * List to populate dropdown
   */
  @Input() public list: string[] = [];
  /**
   * xx
   */
  @Input() public value: any;
  /**
   * If passing in an object from ngfor, index
   */
  @Input() public row?: number;
  /**
   * If passing in an object from ngfor, iteration
   */
  @Input() public object: any;
  /**
   * Optional placeholder to display
   */
  @Input() public placeholder: string;
  /**
   * List filtered with current input
   */
  public filteredOptions: Observable<string[]>;
  public myControl = new FormControl();

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
    setTimeout(() => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    }, 350);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.list.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   * Filters value in input box from list
   * @param val 
   * @returns filtered list
   */
  filter(val: string): Observable<any[]> {
    return this.filteredOptions.pipe(
        map(response => response.filter(option => {
          return option.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  getOptionText(option: any) {
    let result = (this.value) ? option : 'set'
    return option;
  }

  /**
   * Emits selected option from dropdown
   * @param $event $event.target / $event.option
   */
  sendOutput($event: any) {
    this.optionOutput.emit($event.value);
  }

  /**
   * Emits text from input
   * Used to select option that is not in list, i.e. create new
   * @param $event value
   */
  setText() {
    this.textOutput.emit(this.value);
  }

}
