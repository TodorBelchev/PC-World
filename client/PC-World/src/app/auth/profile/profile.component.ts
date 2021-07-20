import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app-state.interface';
import { AuthService } from '../auth.service';
import { IUser } from '../user.interface';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: IUser = {
    email: '',
    _id: '',
    isAdmin: false,
    city: '',
    location: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };
  editMode: boolean = false;
  editProfileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.editProfileForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      city: [''],
      location: ['']
    })
  }

  ngOnInit(): void {
    this.authService.loadProfile().subscribe(
      user => {
        this.user = Object.assign(this.user, user);
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
    console.log(this.editProfileForm.value);

    this.authService.editProfile(this.editProfileForm.value)
      .subscribe(
        user => {
          this.store.dispatch(AuthActions.auth_success(user));
          this.editMode = !this.editMode;
          this.user = Object.assign(this.user, user);
        },
        error => {
          console.log(error.message);
        }
      )
  }

}
