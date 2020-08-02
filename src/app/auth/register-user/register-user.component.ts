import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService: Title
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

  }
}
