import { 
  Component,
  EventEmitter, 
  Input, 
  OnInit, 
  Output 
} from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
/**
 * @param [id] input id
 * @param [type] input type
 * @param [label] input label
 */
export class InputTextComponent implements OnInit {
  @Output() output = new EventEmitter();
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  emit($event: string | number | Date) {
    this.output.emit($event);
  }

}
