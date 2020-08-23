import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { selectRecord } from 'src/app/state';
import { Record } from 'src/app/state/records/records.model';
import { Purchase } from 'src/app/shared/models/purchase.model';
import { RecordsState } from 'src/app/state/records/records.reducer';
import { UpdateRecord } from 'src/app/state/records/records.actions';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-create-record-page',
  templateUrl: './create-record-page.component.html',
  styleUrls: ['./create-record-page.component.scss']
})
export class CreateRecordPageComponent implements OnInit {

  selectedRecord$: Observable<Record>;
  form: FormGroup;
  step = 10;

  constructor(
    private titleService: Title,
    private ns: NotificationService,
    private fb: FormBuilder,
    private store: Store<RecordsState>
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
    this.titleService.setTitle(`Add New Item | Shopping List`);
    this.selectedRecord$ = this.store.pipe(select(selectRecord));
    this.units.valueChanges.subscribe(() => this.quantity.reset(10));
  }

  get units() {
    return this.form.get('units');
  }

  get quantity() {
    return this.form.get('quantity');
  }

  initForm() {
    return this.fb.group({
      name: [null, Validators.required],
      units: ['amount'],
      quantity: [10]
    });
  }

  calcQuantity() {
    const val = this.quantity.value / this.step;
    const units = this.units.value;
    const weight = units === 'weight' && val < 1000 ? `${val}g` : `${val / 1000}kg`;
    const amount = units === 'amount' && val > 1 ? `${val}pcs` : `${val}pc`;
    return units === 'weight' ? weight : amount;
  }

  onSubmit(record: Record) {
    const item: Purchase = {
      ...this.form.value,
      id: uuidv4(),
      quantity: this.calcQuantity()
    }

    this.store.dispatch(new UpdateRecord({
      ...record,
      updateDate: Date.now(),
      shoppingList: record.shoppingList ? [...record.shoppingList, item] : [item]
    }));

    this.form.reset({name: null, units: 'amount', quantity: 10});
    this.ns.onAdd(item.name, record.name);
  }

}
