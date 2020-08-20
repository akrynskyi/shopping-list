import { Action } from '@ngrx/store';
import { Record } from './records.model';

export enum RecordsActionTypes {
  createRecord = '[Record] Create',
  recordCreated = '[Record] Created',

  updateRecord = '[Record] Update',
  recordUpdated = '[Record] Updated',

  deleteRecord = '[Record] Delete',
  recordDeleted = '[Record] Deleted',

  loadRecords = '[Records] Load',
  recordsLoaded = '[Records] Loaded',

  selectRecord = '[Record] Selected',
}

export class CreateRecord implements Action {
  readonly type = RecordsActionTypes.createRecord;
  constructor(public payload: Record) { }
}

export class RecordCreated implements Action {
  readonly type = RecordsActionTypes.recordCreated;
  constructor(public payload: Record) { }
}

export class UpdateRecord implements Action {
  readonly type = RecordsActionTypes.updateRecord;
  constructor(public payload: Record) { }
}

export class RecordUpdated implements Action {
  readonly type = RecordsActionTypes.recordUpdated;
  constructor(public payload: Record) { }
}

export class DeleteRecord implements Action {
  readonly type = RecordsActionTypes.deleteRecord;
  constructor(public payload: Record) { }
}

export class RecordDeleted implements Action {
  readonly type = RecordsActionTypes.recordDeleted;
  constructor() { }
}

export class LoadRecords implements Action {
  readonly type = RecordsActionTypes.loadRecords;
  constructor(public payload: string) { }
}

export class RecordsLoaded implements Action {
  readonly type = RecordsActionTypes.recordsLoaded;
  constructor(public payload: Record[]) { }
}

export class SelectRecord implements Action {
  readonly type = RecordsActionTypes.selectRecord;
  constructor(public payload: Record) { }
}

export type RecordsActions = CreateRecord
  | RecordCreated
  | UpdateRecord
  | RecordUpdated
  | DeleteRecord
  | RecordDeleted
  | LoadRecords
  | RecordsLoaded
  | SelectRecord;
