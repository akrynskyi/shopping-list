import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as moment from 'moment';
import { NotificationService } from './notification.service';

export interface UserCred {
  username?: string,
  email: string,
  password: string
}

export interface User {
  username: string,
  email: string,
}

export interface RegisterCred {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface AuthResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_TOKEN = 'AUTH_TOKEN';

  constructor(
    private http: HttpClient,
    private ns: NotificationService
  ) { }

  get token(): string {
    if (!localStorage.getItem(this.AUTH_TOKEN)) return null;
    const { token, expDate } = JSON.parse(localStorage.getItem(this.AUTH_TOKEN));

    if (new Date().getTime() > new Date(expDate).getTime()) {
      this.logout();
      return null;
    }

    return token;
  }

  setToken(resp: AuthResponse) {
    const expDate = moment().seconds(+resp.expiresIn).toDate().toString();
    const token = { token: resp.idToken, expDate };

    localStorage.setItem(this.AUTH_TOKEN, JSON.stringify(token));
  }

  errorsHandler(error: HttpErrorResponse) {
    const code = error.error.error.message;
    this.ns.message.next({type: 'default', code});
    return throwError(error);
  }

  register(credentials: UserCred): Observable<User> {
    const { username, email, password} = credentials;
    const regBody: RegisterCred = { email, password, returnSecureToken: true };
    const userDbRecord = { username, email };

    return this.http
      .post<AuthResponse>(`${environment.signUpEndpoint}${environment.apiKey}`, regBody)
      .pipe(
        tap(this.setToken.bind(this)),
        switchMap(resp => this.http.put<User>(`${environment.dbEndpoint}/users/${resp.localId}.json`, userDbRecord)),
        catchError(this.errorsHandler.bind(this))
      );
  }

  login(credentials: UserCred): Observable<User> {
    return this.http
      .post<AuthResponse>(`${environment.signInEndpoint}${environment.apiKey}`, {...credentials, returnSecureToken: true})
      .pipe(
        tap(this.setToken.bind(this)),
        switchMap(resp => this.http.get<User>(`${environment.dbEndpoint}/users/${resp.localId}.json`)),
        catchError(this.errorsHandler.bind(this))
      )
  }

  logout() {
    localStorage.removeItem(this.AUTH_TOKEN);
  }

}
