import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/admin/admin.service';
import { NavbarTopics } from '@app/app-models/admin.models';

@Component({
  selector: 'app-navbar-settings',
  templateUrl: './navbar-settings.component.html',
  styleUrls: ['./navbar-settings.component.scss']
})
export class NavbarSettingsComponent implements OnInit {
  public navbarTopics: NavbarTopics[] = [];
  public selectedTopic: string | null = null;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getNavbarTopics();
  }

  getNavbarTopics() {
    this.adminService.getNavbarTopics().subscribe(
      data => {
        this.navbarTopics = JSON.parse(JSON.stringify(data));
      }
    )
  }

  setTopic($event: any) {
    console.log($event.target.value)
    this.selectedTopic = (this.selectedTopic == $event.target.value) ? null : $event.target.value;
  }

}
