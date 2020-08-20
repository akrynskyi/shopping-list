import { Action } from '@ngrx/store';
import { User } from './user.model';
import { UserCred } from 'src/app/shared/models/auth.models';

export enum UserActionTypes {
  registerUser = '[User] Register',
  loginUser = '[User] Login in',
  loadUser = '[User] Loaded',
  updateUser = '[User] Updated',
  setUser = '[User] Setted',
  removeUser = '[User] Removed',
  logoutUser = '[User] Logout'
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

export class UpdateUser implements Action {
  readonly type = UserActionTypes.updateUser;
  constructor(public payload: User) { }
}

export class SetUser implements Action {
  readonly type = UserActionTypes.setUser;
  constructor(public payload: User) { }
}

export class RemoveUser implements Action {
  readonly type = UserActionTypes.removeUser;
  constructor() { }
}

export class LogoutUser implements Action {
  readonly type = UserActionTypes.logoutUser;
  constructor() { }
}

export type UserActions = RegisterUser
  | LoginUser
  | LoadUser
  | UpdateUser
  | SetUser
  | RemoveUser
  | LogoutUser;
