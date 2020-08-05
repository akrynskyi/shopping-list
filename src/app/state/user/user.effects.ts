import { Injectable } from "@angular/core";
import { AuthService } from 'src/app/shared/services/auth.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserActionTypes, LoadUser, SetUser, LoginUser } from './user.actions';
import { mergeMap, map, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType(UserActionTypes.loginUser),
    exhaustMap((action: LoginUser) =>
      this.auth.login(action.payload).pipe(map(user => new SetUser(user)))
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
    private actions$: Actions
  ) { }

}
