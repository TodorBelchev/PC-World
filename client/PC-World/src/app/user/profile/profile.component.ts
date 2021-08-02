import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { emailValidatorFactory } from 'src/app/shared/validators';
import { IUser } from '../../shared/interfaces/user.interface';
import * as AuthActions from '../store/auth.actions';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: IUser | undefined;
  editMode: boolean = false;
  editProfileForm: FormGroup;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  serverError: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.editProfileForm = this.fb.group({
      email: ['', [Validators.required], emailValidatorFactory()],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      city: [''],
      location: ['']
    })
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.loadProfile().subscribe(
      user => {
        this.user = user;
        this.editProfileForm.patchValue(user);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.message = 'Something went wrong. Please try again later.';
        this.msgType = 'error';
        this.serverError = true;
      }
    );
  }

  onEditClick(): void {
    this.editMode = !this.editMode;
  }

  onSubmit(): void {
    if (this.editProfileForm.invalid || this.editProfileForm.pending) {
      let message = '';
      this.msgType = 'error';
      this.editProfileForm.get('email')?.hasError('required') ? message += 'Email is required.' : '';
      this.editProfileForm.get('email')?.hasError('invalidEmail') ? message += 'Email is invalid.' : '';
      this.message = message;
      return;
    }
    this.isLoading = true;
    this.userService.editProfile(this.editProfileForm.value)
      .subscribe(
        user => {
          this.store.dispatch(AuthActions.auth_success(user));
          this.editMode = !this.editMode;
          this.user = Object.assign(this.user, user);
          this.msgType = 'success';
          this.message = 'Profile saved';
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.message = 'Something went wrong. Please try again later.';
          this.msgType = 'error';
          this.serverError = true;
        }
      )
  }

  onCloseNotification(): void {
    this.msgType = undefined;
    this.message = undefined;
  }

}
