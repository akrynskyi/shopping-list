import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from './user/user.reducer';

export interface AppState {
  user: fromUser.UserState
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.userReducer
}
