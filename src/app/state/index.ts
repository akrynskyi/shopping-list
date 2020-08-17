import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './user/user.reducer';

export interface AppState {
  user: fromUser.UserState
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.userReducer
}

/*
 * USER SELECTORS
*/

export const selectUserState = createFeatureSelector<fromUser.UserState>('user');

export const selectUserLoading = createSelector(
  selectUserState,
  fromUser.getUserLoading
);

export const selectUser = createSelector(
  selectUserState,
  fromUser.getUser
);
