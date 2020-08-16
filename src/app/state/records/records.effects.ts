import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RecordsService } from 'src/app/shared/services/records.service';
import { RecordsActionTypes, LoadRecords, SetRecords, CreateRecord, AddRecord } from './records.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordsEffects {

  @Effect()
  loadRecords$ = this.actions$.pipe(
    ofType(RecordsActionTypes.loadRecords),
    mergeMap((action: LoadRecords) =>
      this.records.loadRecords(action.payload).pipe(
        map(records => new SetRecords(records))
      )
    )
  );

  @Effect()
  createRecord$ = this.actions$.pipe(
    ofType(RecordsActionTypes.createRecord),
    mergeMap((action: CreateRecord) =>
      this.records.createRecord(action.payload).pipe(
        map(resp => new AddRecord({...action.payload, id: resp.name}))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private records: RecordsService
  ) { }

}
