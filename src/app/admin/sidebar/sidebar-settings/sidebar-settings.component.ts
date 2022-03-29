import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/admin/admin.service';
import { SidebarTopics } from '@app/app-models/admin.models';

@Component({
  selector: 'app-sidebar-settings',
  templateUrl: './sidebar-settings.component.html',
  styleUrls: ['./sidebar-settings.component.scss']
})
export class SidebarSettingsComponent implements OnInit {
  public sidebarTopics: SidebarTopics[] = [];
  public selectedTopic: string | null = null;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getSidebarTopics();
  }

  getSidebarTopics() {
    this.adminService.getSidebarTopics().subscribe(
      data => {
        console.log(data)
        this.sidebarTopics = JSON.parse(JSON.stringify(data));
      }
    )
  }

  setTopic($event: any) {
    console.log($event.target.value)
    this.selectedTopic = (this.selectedTopic == $event.target.value) ? null : $event.target.value;
  }

}
