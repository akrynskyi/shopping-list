import { ActionReducerMap, createFeatureSelector, createSelector, ActionReducer, Action, INIT } from '@ngrx/store';

import { UserActionTypes } from './user/user.actions';
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

export const selectRecordsLoading = createSelector(
  selectRecordsState,
  fromRecords.getRecordsLoading
);

export const selectAllRecords = createSelector(
  selectRecordsState,
  fromRecords.getAllRecords
);

export const selectRecord = createSelector(
  selectRecordsState,
  fromRecords.getSelectedRecord
);

export const selectShoppingListItem = createSelector(
  selectRecordsState,
  (state: fromRecords.RecordsState, { id }) => {
    return state.selectedRecord.shoppingList.find(item => {
      if (typeof(item.id) === 'number') {
        return item.id === +id;
      }

      return item.id === id;
    });
  }
);

/*
 * META REDUCER
*/

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: Action) => {
    if (action.type === UserActionTypes.logoutUser) {
      return reducer(undefined, { type: INIT });
    }

    return reducer(state, action);
  }
}
