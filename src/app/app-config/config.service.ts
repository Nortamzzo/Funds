import { Injectable } from '@angular/core';
import { NotificationService } from '@app/app-services/notification.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private devMode: boolean = false;
  private devUrl: any = 'http://localhost:5000';
  private prodUrl: any = 'http//192.168.1.10:5000';
  public apiUrl = new BehaviorSubject<string>(this.prodUrl);
  
  constructor(
    private notif: NotificationService
  ) { }

  toggleApi() {
    this.devMode = !this.devMode;
    (this.devMode) ? this.apiUrl.next(this.prodUrl) : this.apiUrl.next(this.devUrl);
    this.notif.sendChangeApi(true);
  }

  getApiUrl() {
    return this.apiUrl.asObservable();
  }
}