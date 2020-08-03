import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  get isAuthenticated() {
    return null;
  }

  register(credentials: UserCred): Observable<User> {
    const { username, email, password} = credentials;
    const regBody: RegisterCred = { email, password, returnSecureToken: true };
    const userDbRecord = { username, email };

    return this.http
      .post<AuthResponse>(`${environment.signUpEndpoint}${environment.apiKey}`, regBody)
      .pipe(
        tap(resp => console.log(resp)),
        switchMap(resp => this.http.put<User>(`${environment.dbEndpoint}/users/${resp.localId}.json`, userDbRecord)),
        catchError(error => { console.log(error); return throwError(error) })
      );
  }

  login(credentials: UserCred): Observable<User> {
    return this.http
      .post<AuthResponse>(`${environment.signInEndpoint}${environment.apiKey}`, {...credentials, returnSecureToken: true})
      .pipe(
        tap(resp => console.log(resp)),
        switchMap(resp => this.http.get<User>(`${environment.dbEndpoint}/users/${resp.localId}.json`)),
        catchError(error => { console.log('err ', error); return throwError(error) })
      )
  }

}
