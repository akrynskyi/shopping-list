import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService, UserCred } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

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
    private auth: AuthService,
    private ns: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sign in | Shopping List');
    this.form = this.initForm();
    console.log(this.auth.token);
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
    this.ns.loading.next(true);

    this.auth.login(credentials)
      .subscribe(
        user => {
          console.log(user);

          this.router.navigate(['home'], {queryParams: {message: 'login'}});
          this.ns.loading.next(false);
          this.form.reset();
        },
        () => this.ns.loading.next(false)
      );
  }
}
