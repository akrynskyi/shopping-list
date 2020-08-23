import { Record } from "./records.model";
import { RecordsActions, RecordsActionTypes } from './records.actions';

export const initialRecord: Record = {
  name: 'New list',
  createDate: Date.now(),
  shoppingList: null
}

export interface RecordsState {
  loading: boolean,
  records: Record[] | null,
  selectedRecord: Record | null
}

export const initialState: RecordsState = {
  loading: false,
  records: [],
  selectedRecord: null
}

const createRecord = (records: Record[], record: Record) => [...records, record];
const updateRecord = (records: Record[], record: Record) => records
  .map(rec => rec.id === record.id ? Object.assign({}, record) : rec);
const deleteRecord = (records: Record[], record: Record) => records.filter(rec => rec.id !== record.id);
const selectRecord = (records: Record[], record: Record) => {
  const idx = records.findIndex(rec => rec.id === record.id);
  const lastElemIdx = records.length - 1;

  if (idx === 0) {
    return records[idx + 1];
  }

  if (idx <= lastElemIdx) {
    return records[idx - 1];
  }
}

export function recordsReducer(state = initialState, action: RecordsActions): RecordsState {
  switch (action.type) {
    case RecordsActionTypes.recordCreated:
      return {
        loading: state.loading,
        records: createRecord(state.records, action.payload),
        selectedRecord: action.payload
      }

    case RecordsActionTypes.recordUpdated:
      return {
        loading: state.loading,
        records: updateRecord(state.records, action.payload),
        selectedRecord: action.payload
      }

    case RecordsActionTypes.loadRecords:
      return {
        ...state,
        loading: true
      }

    case RecordsActionTypes.recordsLoaded:
      return {
        loading: false,
        records: action.payload,
        selectedRecord: action.payload[0]
      }

    case RecordsActionTypes.selectRecord:
      return {
        loading: state.loading,
        records: state.records,
        selectedRecord: action.payload
      }

    case RecordsActionTypes.deleteRecord:
      return {
        loading: state.loading,
        records: deleteRecord(state.records, action.payload),
        selectedRecord: selectRecord(state.records, action.payload)
      }

    default:
      return state;
  }
}

/*
 * SELECTORS
*/

export const getAllRecords = (state: RecordsState) => state.records;
export const getRecordsLoading = (state: RecordsState) => state.loading;
export const getSelectedRecord = (state: RecordsState) => state.selectedRecord;
