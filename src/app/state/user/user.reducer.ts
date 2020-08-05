import { User } from "./user.model";
import { UserActionTypes, UserActions } from './user.actions';

const initialUser: User = null;

export interface UserState {
  user: User
}

export const initialState: UserState = {
  user: initialUser
}

const setUser = (state: UserState, user: User) => ({ ...state, user });

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.setUser:
      return setUser(state, action.payload);

    case UserActionTypes.removeUser:
      return initialState;

    default:
      return state;
  }
}
