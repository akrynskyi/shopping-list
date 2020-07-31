import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;

  constructor() { }

  get isAuthenticated() {
    return this.isLogin;
  }

  login(exp: boolean) {
    this.isLogin = exp;
  }
}
