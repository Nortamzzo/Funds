import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@app/app-config/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  api: string = '';

  constructor(
    private config: ConfigService
  ) {
    this.config.apiUrl.subscribe(
      data => {
        if (data === 'http://localhost:5000') {
          this.api = 'dev';
        } else {
          this.api = 'prod';
        }
      }
    )
   }

  ngOnInit(): void {
  }

  toggleApi() {
    this.config.toggleApi();
  }
}
