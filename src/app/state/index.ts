import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './user/user.reducer';
import * as fromRecords from './records/records.reducer';

export interface AppState {
  user: fromUser.UserState,
  records: fromRecords.RecordsState
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.userReducer,
  records: fromRecords.recordsReducer
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

/*
 * RECORDS SELECTORS
*/

export const selectRecordsState = createFeatureSelector<fromRecords.RecordsState>('records');

export const selectAllRecords = createSelector(
  selectRecordsState,
  fromRecords.getAllRecords
);
