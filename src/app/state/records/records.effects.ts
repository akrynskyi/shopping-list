import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { RecordsService } from 'src/app/shared/services/records.service';
import {
  RecordsActionTypes,
  LoadRecords,
  CreateRecord,
  UpdateRecord,
  RecordUpdated,
  RecordsLoaded,
  RecordCreated,
  DeleteRecord,
  RecordDeleted
} from './records.actions';

@Injectable({
  providedIn: 'root'
})
export class RecordsEffects {

  @Effect()
  loadRecords$ = this.actions$.pipe(
    ofType(RecordsActionTypes.loadRecords),
    mergeMap((action: LoadRecords) =>
      this.records.loadRecords(action.payload).pipe(
        map(resp => new RecordsLoaded(resp))
      )
    )
  );

  @Effect()
  createRecord$ = this.actions$.pipe(
    ofType(RecordsActionTypes.createRecord),
    mergeMap((action: CreateRecord) =>
      this.records.createRecord(action.payload).pipe(
        map(resp => new RecordCreated({...action.payload, id: resp.name}))
      )
    )
  );

  @Effect()
  updateRecord$ = this.actions$.pipe(
    ofType(RecordsActionTypes.updateRecord),
    mergeMap((action: UpdateRecord) =>
      this.records.updateRecord(action.payload).pipe(
        map(resp => new RecordUpdated(resp))
      )
    )
  );

  @Effect()
  deleteRecord$ = this.actions$.pipe(
    ofType(RecordsActionTypes.deleteRecord),
    mergeMap((action: DeleteRecord) =>
      this.records.deleteRecord(action.payload).pipe(
        map(() => new RecordDeleted())
      )
    )
  );

  constructor(
    private actions$: Actions,
    private records: RecordsService
  ) { }

}
