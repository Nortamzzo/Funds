import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentStyleService {

  constructor(
  ) { }

  //***********************************************************************************************
  // Sidebar
  sidebarHeight: string = '45vh';

  //***********************************************************************************************
  // Action Center
  actionCenterHeight = {
    short: '5vh',
    medium: '10vh',
    tall: '25vh'
  };
  actionCenterStyleSet = new BehaviorSubject<any>({});

  //***********************************************************************************************
  // Content
  contentHeight = {
    short: '25vh',
    medium: '50vh',
    tall: '75vh'
  };
  contentStyleSet = new BehaviorSubject<any>({});
  

}
