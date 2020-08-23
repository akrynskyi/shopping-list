import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Record } from 'src/app/state/records/records.model';
import { RecordsState } from 'src/app/state/records/records.reducer';
import { selectAllRecords, selectRecord, selectRecordsLoading } from 'src/app/state';
import { CreateRecord, SelectRecord, DeleteRecord } from 'src/app/state/records/records.actions';
import { NotificationService, MessageCodes } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy {

  recordsLoaded$: Observable<boolean>;
  records$: Observable<Record[]>;
  selectedRecord: Record;
  recordName: string = null;
  createPopup = false;
  clickedItemId: string;
  sortOption = 'new:first';
  sub: Subscription;

  constructor(
    private titleService: Title,
    private store: Store<RecordsState>,
    private ns: NotificationService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Get started | Shopping List');
    this.recordsLoaded$ = this.store.pipe(select(selectRecordsLoading));
    this.records$ = this.store.pipe(select(selectAllRecords));
    this.sub = this.store
      .pipe(select(selectRecord))
      .subscribe(rec => this.selectedRecord = rec);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  closePopup(e: Event) {
    if (e.target !== e.currentTarget) return;
    this.createPopup = false;
  }

  addSelectedClass(id: string) {
    if (!this.selectedRecord) return;
    return this.selectedRecord.id === id;
  }

  selectRecord(e: Event, record: Record) {
    if (e.target !== e.currentTarget) return;
    this.clickedItemId = null;
    this.store.dispatch(new SelectRecord(record));
  }

  createRecord() {
    const newRecord: Record = {
      name: this.recordName,
      createDate: Date.now(),
      shoppingList: null
    }

    this.store.dispatch(new CreateRecord(newRecord));
    this.recordName = null;
    this.createPopup = false;
  }

  deleteRecord(record: Record) {
    this.clickedItemId = null;

    this.ns.confirm(
      MessageCodes.withText,
      `🗑️ Are you sure you want to delete "${record.name.toLowerCase()}" list? You can\'t undo this action`
    ).pipe(take(1)).subscribe(val => {
      if (!val) return;
      this.store.dispatch(new DeleteRecord(record));
    });
  }

}
