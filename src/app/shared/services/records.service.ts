import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from 'src/app/state/records/records.model';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as db from '../models/db.models';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  loadRecords(userId: string): Observable<Record[]> {
    return this.http
      .get<db.RecordsList>(`${environment.dbEndpoint}/records/${userId}.json`)
      .pipe(
        map(resp => {
          if (!resp) return [];
          return Object.keys(resp).map(key => ({...resp[key], id: key}));
        })
      );
  }

  createRecord(record: Record): Observable<db.DbResponse> {
    return this.http
      .post<db.DbResponse>(`${environment.dbEndpoint}/records/${this.auth.userId}.json`, record);
  }

  updateRecord(record: Record): Observable<Record> {
    return this.http
      .put<Record>(`${environment.dbEndpoint}/records/${this.auth.userId}/${record.id}.json`, record);
  }

}
