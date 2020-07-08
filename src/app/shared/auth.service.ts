import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;

  constructor(private router: Router) { }

  get authStatus() {
    return this.isLogin;
  }

  login(exp: boolean) {
    this.isLogin = exp;
  }
}
