import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { register_start } from '../../user/store/auth.actions';
import { emailValidatorFactory, minLengthFactory, sameValueAsFactory } from 'src/app/shared/validators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  killSubscription = new Subject();
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required], emailValidatorFactory()
      ],
      password: ['', [Validators.required], minLengthFactory(8)],
      rePass: ['', [Validators.required], sameValueAsFactory(
        () => this.registerForm?.get('password'), this.killSubscription
      )],
      check: ['']
    });
  }

  onSubmit(): void {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.store.dispatch(register_start({ email, password }));
    this.registerForm.reset();
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }

}
