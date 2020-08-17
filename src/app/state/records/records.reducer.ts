import { Record } from "./records.model";
import { RecordsActions, RecordsActionTypes } from './records.actions';

const initialRecord: Record = {
  name: 'New list',
  createDate: Date.now(),
  shoppingList: []
}

export interface RecordsState {
  records: Record[],
  selectedRecord: Record | null
}

export const initialState: RecordsState = {
  records: [initialRecord],
  selectedRecord: null
}

const createRecord = (records: Record[], record: Record) => [...records, record];

export function recordsReducer(state = initialState, action: RecordsActions): RecordsState {
  switch (action.type) {
    case RecordsActionTypes.addRecord:
      return {
        records: createRecord(state.records, action.payload),
        selectedRecord: state.selectedRecord
      }

    case RecordsActionTypes.setRecords:
      return {
        records: action.payload,
        selectedRecord: state.selectedRecord
      }

    default:
      return state;
  }
}

/*
 * SELECTORS
*/

export const getAllRecords = (state: RecordsState) => state.records;
