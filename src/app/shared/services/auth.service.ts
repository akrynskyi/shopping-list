import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Store } from '@ngrx/store';
import { SetUser } from 'src/app/state/user/user.actions';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/state/user/user.model';
import * as moment from 'moment';
import * as auth from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_TOKEN = 'AUTH_TOKEN';

  constructor(
    private http: HttpClient,
    private ns: NotificationService,
    private router: Router,
    private store: Store
  ) { }

  get token(): string {
    const { token, expDate } = parse<auth.AuthToken>(this.AUTH_TOKEN);
    if (!token) return null;

    if (new Date().getTime() > new Date(expDate).getTime()) {
      this.logout();
      return null;
    }

    return token;
  }

  get userId(): string {
    const { userId } = parse<auth.AuthToken>(this.AUTH_TOKEN);
    if (!userId) return null;
    return userId;
  }

  setToken(resp: auth.AuthResponse) {
    const expDate = moment().seconds(+resp.expiresIn).toDate().toString();
    const token = { token: resp.idToken, expDate, userId: resp.localId };

    localStorage.setItem(this.AUTH_TOKEN, JSON.stringify(token));
  }

  errorsHandler(error: HttpErrorResponse) {
    const code = error.error.error.message;
    this.ns.message.next({type: 'default', code});
    this.store.dispatch(new SetUser(null));
    return throwError(error);
  }

  register(credentials: auth.UserCred): Observable<User> {
    const { username, email, password} = credentials;
    const regBody: auth.RegisterCred = { email, password, returnSecureToken: true };
    const userDbRecord = { username, email };

    return this.http
      .post<auth.AuthResponse>(`${environment.signUpEndpoint}${environment.apiKey}`, regBody)
      .pipe(
        tap(this.setToken.bind(this)),
        switchMap(resp => this.http.put<User>(`${environment.dbEndpoint}/users/${resp.localId}.json`, userDbRecord)),
        catchError(this.errorsHandler.bind(this))
      );
  }

  login(credentials: auth.UserCred): Observable<User> {
    return this.http
      .post<auth.AuthResponse>(`${environment.signInEndpoint}${environment.apiKey}`, {...credentials, returnSecureToken: true})
      .pipe(
        tap(this.setToken.bind(this)),
        switchMap(resp => this.loadUser(resp.localId)),
        catchError(this.errorsHandler.bind(this))
      )
  }

  loadUser(userId: string): Observable<User> {
    return this.http
      .get<User>(`${environment.dbEndpoint}/users/${userId}.json`)
      .pipe(catchError(this.errorsHandler.bind(this)));
  }

  logout() {
    localStorage.removeItem(this.AUTH_TOKEN);
    this.router.navigate([''], {queryParams: {message: 'logout' }});
  }

}

function parse<T extends Object>(key: string): T {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {};
}
