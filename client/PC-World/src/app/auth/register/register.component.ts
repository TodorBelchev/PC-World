import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { emailValidatorFactory, minLengthFactory, sameValueAsFactory } from 'src/app/shared/validators';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { AuthService } from '../auth.service';
import { auth_success } from 'src/app/user/store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  killSubscription = new Subject();
  error: string = '';
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required], emailValidatorFactory()
      ],
      password: ['', [Validators.required], minLengthFactory(8)],
      rePass: ['', [Validators.required], sameValueAsFactory(
        () => this.registerForm?.get('password'), this.killSubscription
      )],
      terms: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.registerForm.pending) {
      let message = '';
      if (this.registerForm.pending) {
        message = 'Something went wrong. Try again.';
      } else {
        message = '';
      }
      this.registerForm.get('email')?.hasError('required') ? message += `Email is required.` : '';
      this.registerForm.get('email')?.hasError('invalidEmail') ? message += `\nInvalid email.` : '';
      this.registerForm.get('password')?.hasError('required') ? message += `\nPassword is required.` : '';
      this.registerForm.get('password')?.hasError('minLength') ? message += `\nPassword must be at least 8 characters!` : '';
      this.registerForm.get('rePass')?.hasError('required') ? message += `\nRepeat password is required.` : '';
      this.registerForm.get('rePass')?.hasError('minLength') ? message += `\nRepeat password must be at least 8 characters!` : '';
      this.registerForm.get('rePass')?.value !== this.registerForm.get('password')?.value ? message += `\nPasswords don\'t match!` : '';
      this.registerForm.get('terms')?.hasError('required') ? message += `\nAgreement is required!` : '';
      this.error = message;
      return;
    }

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.isLoading = true;
    this.authService.register({ email, password }).subscribe(
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
        this.registerForm.reset();
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
