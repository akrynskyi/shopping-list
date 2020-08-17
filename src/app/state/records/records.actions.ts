import { Action } from '@ngrx/store';
import { Record } from './records.model';

export enum RecordsActionTypes {
  loadRecords = '[Records] Loaded',
  setRecords = '[Records] Setted',
  createRecord = '[Record] Create',
  updateRecord = '[Record] Update',
  addRecord = '[Record] Added'
}

export class CreateRecord implements Action {
  readonly type = RecordsActionTypes.createRecord;
  constructor(public payload: Record) { }
}

export class UpdateRecord implements Action {
  readonly type = RecordsActionTypes.updateRecord;
  constructor(public payload: Record) { }
}

export class AddRecord implements Action {
  readonly type = RecordsActionTypes.addRecord;
  constructor(public payload: Record) { }
}

export class SetRecords implements Action {
  readonly type = RecordsActionTypes.setRecords;
  constructor(public payload: Record[]) { }
}

export class LoadRecords implements Action {
  readonly type = RecordsActionTypes.loadRecords;
  constructor(public payload: string) { }
}

export type RecordsActions = CreateRecord | UpdateRecord | AddRecord | SetRecords | LoadRecords;
