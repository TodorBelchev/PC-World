import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { register_start } from '../../user/store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      rePass: [
        '',
        Validators.required
      ],
      check: [
        ''
      ]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.store.dispatch(register_start({ email, password }));
    this.registerForm.reset();
  }

}
