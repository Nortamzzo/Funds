import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from '@app/app-config/config.service';
import { AuthService } from '@app/app-services/data/auth.service';
import { AppService } from 'src/app/app-services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() output = new EventEmitter<any>();
  @Output() navEmit = new EventEmitter<any>();
  @Input() balance: number | null = null;
  public loggedIn: boolean = false;
  
  constructor(
    public appService: AppService,
    public conf: ConfigService,
    private auth: AuthService,
  ) {
    this.auth.loggedIn.subscribe(
      data => {
        if (data) {
          this.loggedIn = true;
        }
      }
    )
   }

  ngOnInit(): void {
    
  }

  logout() {
    this.auth.logout();
  }

  navClick($event: any) {
    this.navEmit.emit($event.target.value);
  }
}
