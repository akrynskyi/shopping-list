import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { RecordsState } from 'src/app/state/records/records.reducer';
import { Record } from 'src/app/state/records/records.model';
import { selectRecord } from 'src/app/state';

@Component({
  selector: 'app-create-record-page',
  templateUrl: './create-record-page.component.html',
  styleUrls: ['./create-record-page.component.scss']
})
export class CreateRecordPageComponent implements OnInit {

  selectedRecord$: Observable<Record>;

  constructor(
    private titleService: Title,
    private ns: NotificationService,
    private store: Store<RecordsState>
  ) { }

  ngOnInit(): void {
    this.titleService
      .setTitle(`Add new item | Shopping List`);
    this.selectedRecord$ = this.store.pipe(select(selectRecord));
  }

  // create() {
  //   const name: string = this.name.nativeElement.value;
  //   const val: number = this.quantity.nativeElement.value;

  //   const quantity: string = this.option === 'amount' ? `${val}`
  //   : this.option === 'weight' && val < 1000 ? `${val}g` : `${val / 1000}kg`;

  //   if (!name.trim()) {
  //     this.notifService.onEmpty('name');
  //     this.name.nativeElement.focus();
  //     return;
  //   };

  //   // this.shoppingService.addItem({
  //   //   id: Date.now(),
  //   //   name,
  //   //   quantity,
  //   //   option: this.option
  //   // });

  //   this.name.nativeElement.value = '';
  //   this.quantity.nativeElement.value = '';
  // }
}
