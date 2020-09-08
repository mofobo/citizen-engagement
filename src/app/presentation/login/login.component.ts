import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthRequestModel} from '../../core/domain/auth-request.model';
import {LoginUsecase} from '../../core/usecases/login.usecase';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequestModel;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;

  constructor(private loginUsecase: LoginUsecase, private router: Router) {
    this.authRequest = new AuthRequestModel();
    this.loginError = false;
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    console.log('i m here');
    // Only do something if the form is valid
    if (form.valid) {
      // Hide any previous login error.
      this.loginError = false;

      // Perform the authentication request to the API.
      this.loginUsecase.execute(this.authRequest).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err) => {
          this.loginError = true;
          console.warn(`Authentication failed: ${err.message}`);
        },
      });
    }
  }
}
