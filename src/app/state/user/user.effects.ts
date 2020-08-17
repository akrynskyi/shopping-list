import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserActionTypes, LoadUser, SetUser, LoginUser, RegisterUser } from './user.actions';
import { mergeMap, map, exhaustMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {

  @Effect()
  registerUser$ = this.actions$.pipe(
    ofType(UserActionTypes.registerUser),
    exhaustMap((action: RegisterUser) =>
      this.auth.register(action.payload).pipe(
        tap(() => this.redirectToHomePage()),
        map(user => new SetUser(user))
      )
    )
  )

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType(UserActionTypes.loginUser),
    exhaustMap((action: LoginUser) =>
      this.auth.login(action.payload).pipe(
        tap(() => this.redirectToHomePage()),
        map(user => new SetUser(user))
      )
    )
  )

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserActionTypes.loadUser),
    mergeMap((action: LoadUser) =>
      this.auth.loadUser(action.payload).pipe(map(user => new SetUser(user)))
    )
  );

  constructor(
    private auth: AuthService,
    private actions$: Actions,
    private router: Router
  ) { }

  redirectToHomePage() {
    this.router.navigate(['home'], {queryParams: {message: 'login'}})
  }
}
