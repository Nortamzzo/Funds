import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/admin/admin.service';
import { NavbarLink } from '@app/app-models/admin.models';
import { ConfigService } from '@app/app-services/data/config.service';

@Component({
  selector: 'app-navbar-links-settings',
  templateUrl: './navbar-links-settings.component.html',
  styleUrls: ['./navbar-links-settings.component.scss']
})
export class NavbarLinksSettingsComponent implements OnInit {
  public navbarLinks: NavbarLink[] = [];

  constructor(
    private configService: ConfigService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getNavbarLinks();
  }

  getNavbarLinks() {
    this.configService.getNavbarLinks().subscribe(
      data => {
        this.navbarLinks = JSON.parse(JSON.stringify(data.Value));
        console.log(data)
      }
    )
  }

  toggleItem($event: any) {
    console.log($event.checked)
  }

}
