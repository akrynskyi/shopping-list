import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sign in | Shopping List');
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, {validators: [Validators.required, Validators.email]}],
      password: [null, {validators: [Validators.required, Validators.minLength(6)]}]
    });
  }

  onSubmit() {

  }
}
