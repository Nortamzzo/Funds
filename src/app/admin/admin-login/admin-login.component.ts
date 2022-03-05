import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  private error: string = null || '';
  private isLoading: boolean = false;
  public adminForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.adminForm = formBuilder.group({
      AdminName: ['', Validators.required],
      AdminPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  /**
   * login(): Calls AuthService login()
   * @param loginForm: { Email, Password }
   */
  login() {
    this.adminService.login(
      this.adminForm.value
      );
    // this.router.navigate(['/ledger']);
  }

   /**
   * login(): Calls AuthService login()
   * @param loginForm: { Email, Password }
   */
    register() {
      this.adminService.register(
        this.adminForm.value
        );
      // this.router.navigate(['/ledger']);
    }
}