import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '@app/app-services/data/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private error: string = null || '';
  private isLoading: boolean = false;
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  /**
   * login(): Calls AuthService login()
   * @param loginForm: { Email, Password }
   */
  login() {
    this.authService.login(
      this.loginForm.value
      );
    // this.router.navigate(['/ledger']);
  }
}