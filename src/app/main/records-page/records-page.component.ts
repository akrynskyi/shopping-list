import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { selectRecord } from 'src/app/state';
import { Record } from 'src/app/state/records/records.model';
import { Purchase } from 'src/app/shared/models/purchase.model';
import { RecordsState } from 'src/app/state/records/records.reducer';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  selectedRecord$: Observable<Record>;

  constructor(
    private router: Router,
    private titleService: Title,
    private store: Store<RecordsState>
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('List | Shopping List');
    this.selectedRecord$ = this.store.pipe(select(selectRecord));
  }

  toDetail(item: Purchase) {
    this.router.navigate(['../home', 'details', item.name, item.id]);
  }

}
