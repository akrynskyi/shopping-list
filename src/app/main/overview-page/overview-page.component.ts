import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Record } from 'src/app/state/records/records.model';
import { RecordsState } from 'src/app/state/records/records.reducer';
import { selectAllRecords } from 'src/app/state';
import { CreateRecord } from 'src/app/state/records/records.actions';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  records$: Observable<Record[]>
  recordName: string = null;
  createPopup = false;

  constructor(
    private titleService: Title,
    private store: Store<RecordsState>
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Get started | Shopping List');
    this.records$ = this.store.pipe(select(selectAllRecords));
  }

  closePopup(e: Event) {
    if (e.target !== e.currentTarget) return;
    this.createPopup = false;
  }

  createRecord() {
    const newRecord: Record = {
      name: this.recordName,
      createDate: Date.now(),
      shoppingList: []
    }

    this.store.dispatch(new CreateRecord(newRecord));
    this.recordName = null;
    this.createPopup = false;
  }

}
