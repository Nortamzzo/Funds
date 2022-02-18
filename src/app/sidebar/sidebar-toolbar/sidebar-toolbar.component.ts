import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InteractorService } from 'src/app/app-services/interactor.service';

@Component({
  selector: 'app-sidebar-toolbar',
  templateUrl: './sidebar-toolbar.component.html',
  styleUrls: ['./sidebar-toolbar.component.scss']
})
export class SidebarToolbarComponent implements OnInit {
  @Output() setView = new EventEmitter<string>();

  constructor(
    private i: InteractorService
  ) { }

  ngOnInit(): void {
  }

  setSidebarView($event: any) {
    this.setView.emit($event.target.value);
  }

}
