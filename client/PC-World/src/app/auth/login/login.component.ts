import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { emailValidatorFactory, minLengthFactory } from 'src/app/shared/validators';


import { auth_success } from '../../user/store/auth.actions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string= '';
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,], emailValidatorFactory()],
      password: ['', [Validators.required], minLengthFactory(8)]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.invalid || this.loginForm.pending) {
      let message = '';
      this.loginForm.get('email')?.hasError('required') ? message += `Email is required.` : '';
      this.loginForm.get('email')?.hasError('invalidEmail') ? message += `\nInvalid email.` : '';
      this.loginForm.get('password')?.hasError('required') ? message += `\nPassword is required.` : '';
      this.loginForm.get('password')?.hasError('minLength') ? message += `\nPassword must be at least 8 characters!` : '';
      this.error = message;
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isLoading = true;
    this.authService.login({ email, password }).subscribe(
      user => {
        this.store.dispatch(auth_success({
          _id: user._id,
          city: user.city || '',
          email: user.email,
          isAdmin: user.isAdmin,
          location: user.location || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phoneNumber: user.phoneNumber || ''
        }));
        this.isLoading = false;
        this.loginForm.reset();
        this.router.navigateByUrl('/');
      },
      error => {
        this.isLoading = false;
        if (error.status === 0 || error.status === 500) {
          this.error = 'Something went wrong. Please try again later.'
        } else {
          this.error = error.error.message;
        }
      }
    )
  }

  onCloseNotification(): void {
    this.error = '';
  }

}
