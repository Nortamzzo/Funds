import { Component, OnInit } from '@angular/core';
import { AdminTopics } from '@app/app-models/admin.models';
import { AuthService } from '@app/app-services/data/auth.service';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public admin: Subscription;
  public access: boolean = false;
  public content: string | null = 'ledger';
  public adminTopics: AdminTopics[] = [];
  public selectedControl: string | null = null;

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.user.subscribe(
        data => {
          if (data.UserRoleId === 2) {
            // console.log("true")
            this.access =  true;
          } else {
            this.access = false;
          }
        }
      )
    }, 1000);
    // this.admin = this.adminService.admin.subscribe(admin => {
    //   this.access = !!admin;
    // });
    this.getAdminTopics();
  }

  getAdminTopics() {
    this.adminService.getAdminTopics().subscribe(
      data => {
        console.log(data)
        this.adminTopics = JSON.parse(JSON.stringify(data));
      }
    )
  }

  setControl($event: any) {
    this.selectedControl = (this.selectedControl == $event.target.value) ? null : $event.target.value;
    console.log(this.selectedControl)
  }

}
