import { User } from "./user.model";
import { UserActionTypes, UserActions } from './user.actions';

const initialUser: User = null;

export interface UserState {
  loading: boolean,
  user: User | null
}

export const initialState: UserState = {
  loading: false,
  user: initialUser
}

const setUser = (state: UserState, user: User) => ({ ...state, loading: false, user });

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.registerUser:
      return {...state, loading: true}

    case UserActionTypes.loginUser:
      return {...state, loading: true}

    case UserActionTypes.setUser:
      return setUser(state, action.payload);

    case UserActionTypes.removeUser:
      return initialState;

    default:
      return state;
  }
}

/*
 * SELECTORS
*/

export const getUserLoading = (state: UserState) => state.loading;
export const getUser = (state: UserState) => state.user;
