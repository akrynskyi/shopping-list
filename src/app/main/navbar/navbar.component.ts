import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Store, select } from '@ngrx/store';
import { RecordsState } from 'src/app/state/records/records.reducer';
import { Record } from 'src/app/state/records/records.model';
import { selectRecord } from 'src/app/state';
import { UpdateRecord } from 'src/app/state/records/records.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewChecked, OnDestroy {

  selectedRecord: Record;
  listName = 'No record selected';
  dropdown = false;
  sub: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private store: Store<RecordsState>,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.sub = this.store
      .pipe(select(selectRecord))
      .subscribe(rec => {
        if (!rec) return;
        this.selectedRecord = rec;
        this.listName = rec.name;
      });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  calcWidth(mask: HTMLElement, maxWidth = 500) {
    return maxWidth > mask.offsetWidth ? mask.offsetWidth : maxWidth;
  }

  updateRecord() {
    if (this.selectedRecord.name === this.listName) return;

    this.store.dispatch(new UpdateRecord({
      ...this.selectedRecord,
      name: this.listName,
      updateDate: Date.now()
    }));
  }

}
