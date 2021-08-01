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
  message: string = '';
  type: string = '';

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
    this.userService.loadProfile().subscribe(
      user => {
        this.user = user;
        this.editProfileForm.patchValue(user);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  onEditClick(): void {
    this.editMode = !this.editMode;
  }

  onSubmit(): void {
    if (this.editProfileForm.invalid || this.editProfileForm.pending) {
      let message = '';
      this.type = 'error';
      this.editProfileForm.get('email')?.hasError('required') ? message += 'Email is required.' : '';
      this.editProfileForm.get('email')?.hasError('invalidEmail') ? message += 'Email is invalid.' : '';
      this.message = message;
      return;
    }
    this.userService.editProfile(this.editProfileForm.value)
      .subscribe(
        user => {
          this.store.dispatch(AuthActions.auth_success(user));
          this.editMode = !this.editMode;
          this.user = Object.assign(this.user, user);
          this.type = 'success';
          this.message = 'Profile saved';
        },
        error => {
          this.type = 'error';
          this.message = error.error.message;
          console.log(error.message);
        }
      )
  }

  onCloseNotification(): void {
    this.message = '';
    this.type = '';
  }

}
