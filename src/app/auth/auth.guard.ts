import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  redirectToLogin() {
    this.router.navigate([''], {queryParams: {message: 'not-authenticated'}});
    return false;
  }

  canLoad(route: Route): boolean {
    return this.authService.token ? true : this.redirectToLogin();
  }

}
