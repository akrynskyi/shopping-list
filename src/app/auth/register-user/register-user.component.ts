import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/user/user.reducer';
import { RegisterUser } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private store: Store<UserState>
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Create an account | Shopping List');
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group(
      {
        username: [
          null,
          Validators.required
        ],
        email: [
          null,
          { validators: [Validators.required, Validators.email] }
        ],
        password: [
          null,
          { validators: [Validators.required, Validators.minLength(6)] }
        ],
        confirmPassword: [
          null,
          Validators.required
        ]
      },
      { validator: this.passwordMatchValidator.bind(this) }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const { password, confirmPassword } = formGroup.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({'isMatch': { message: 'Passwords don\'t match' }});
    }
  }

  onSubmit() {
    const { username, email, password } = this.form.value;

    if (this.form.invalid) return;

    this.store.dispatch(new RegisterUser({username, email, password}));
    this.form.reset();
  }
}
