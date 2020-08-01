import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Create account | Shopping List');
  }

}
