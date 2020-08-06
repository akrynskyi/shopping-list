import { Action } from '@ngrx/store';
import { User } from './user.model';
import { UserCred } from 'src/app/shared/models/auth.models';

export enum UserActionTypes {
  registerUser = '[User] Register',
  loginUser = '[User] Login in',
  loadUser = '[User] Loaded',
  setUser = '[User] Setted',
  removeUser = '[User] Removed'
}

export class RegisterUser implements Action {
  readonly type = UserActionTypes.registerUser;
  constructor(public payload: UserCred) { }
}

export class LoginUser implements Action {
  readonly type = UserActionTypes.loginUser;
  constructor(public payload: UserCred) { }
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.loadUser;
  constructor(public payload: string) { }
}

export class SetUser implements Action {
  readonly type = UserActionTypes.setUser;
  constructor(public payload: User) { }
}

export class RemoveUser implements Action {
  readonly type = UserActionTypes.removeUser;
  constructor() { }
}

export type UserActions = RegisterUser | LoginUser | LoadUser | SetUser | RemoveUser;
