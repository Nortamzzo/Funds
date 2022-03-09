import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {
  public content: string | null = 'receipts';

  constructor() { }

  ngOnInit(): void {
  }

  setContent(value: any) {
    this.content = value;
  }

}
