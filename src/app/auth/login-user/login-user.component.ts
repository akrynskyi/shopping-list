import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserCred } from 'src/app/shared/models/auth.models';
import { UserState } from 'src/app/state/user/user.reducer';
import { LoginUser } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private store: Store<UserState>
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sign in | Shopping List');
    this.form = this.initForm();
  }

  initForm() {
    return this.fb.group({
      email: [null, {validators: [Validators.required, Validators.email]}],
      password: [null, {validators: [Validators.required, Validators.minLength(6)]}]
    });
  }

  onSubmit() {
    const credentials = this.form.value as UserCred;

    if (this.form.invalid) return;

    this.store.dispatch(new LoginUser(credentials));
    this.form.reset();
  }
}
