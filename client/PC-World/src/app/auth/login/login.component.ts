import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { emailValidatorFactory, minLengthFactory } from 'src/app/shared/validators';


import { login_start } from '../../user/store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,], emailValidatorFactory()],
      password: ['', [Validators.required], minLengthFactory(8)]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(login_start({ email, password }));
    this.loginForm.reset();
  }
}
