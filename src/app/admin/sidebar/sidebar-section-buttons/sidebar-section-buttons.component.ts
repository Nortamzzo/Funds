import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@app/app-services/data/config.service';

@Component({
  selector: 'app-sidebar-section-buttons',
  templateUrl: './sidebar-section-buttons.component.html',
  styleUrls: ['./sidebar-section-buttons.component.scss']
})
export class SidebarSectionButtonsComponent implements OnInit {
  public sidebarTopicButtons: any[] = [];

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    // this.getSidebarTopics();
  }

  // getSidebarTopics() {
  //   this.configService.getSidebarTopicButtons.subscribe(
  //     data => {
  //       this.sidebarTopicButtons = JSON.parse(JSON.stringify(data.Value));
  //       console.log(data)
  //     }
  //   )
  // }

  toggleItem($event: any) {
    console.log($event.checked)
  }

}
