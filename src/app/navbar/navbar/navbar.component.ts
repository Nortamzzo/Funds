import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '@app/admin/admin.service';
import { AuthService } from '@app/app-services/data/auth.service';
import { ConfigService } from '@app/app-services/data/config.service';
import { Subscription } from 'rxjs';
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
  public admin: boolean = false;
  // Type?
  public navbarLinks: any[] = [];
  public isAuthenticated = false;
  private userSub!: Subscription;
  public loggedIn: boolean = false;
  
  constructor(
    public appService: AppService,
    public config: ConfigService,
    private auth: AuthService,
    private adminService: AdminService,
    public router: Router
  ) {
    this.auth.loggedIn.subscribe(
      data => {
        if (data) {
          this.loggedIn = true;
        }
      }
    );
    setTimeout(() => {
      this.auth.user.subscribe(
        data => {
          if (data.UserRole === 2) {
            // console.log("true")
            this.admin =  true;
          } else {
            this.admin = false;
          }
        }
      )
    }, 1000);
    
   }

  a(term: any) {
    console.log(term)
  }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.isAuthenticated = !!user;
      // if (user.UserRole == 2) {
      //   this.admin = true;
      // }
    });
    this.getNavbarLinks();
  }

  getNavbarLinks() {
    this.config.getNavbarLinks().subscribe(
      data => {
        // this.a(data)
        this.navbarLinks = data.Value;
      }
    )
  }

  logout() {
    this.auth.logout();
  }

  navClick($event: any) {
    console.log($event.target.value)
    this.navEmit.emit($event.target.value);
  }
}
