import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe} from '@angular/common';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { selectRecord } from 'src/app/state';
import { Record } from 'src/app/state/records/records.model';
import { Purchase } from 'src/app/shared/models/purchase.model';
import { RecordsState } from 'src/app/state/records/records.reducer';
import { UpdateRecord } from 'src/app/state/records/records.actions';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-record-details-page',
  templateUrl: './record-details-page.component.html',
  styleUrls: ['./record-details-page.component.scss']
})
export class RecordDetailsPageComponent implements OnInit, OnDestroy {

  @ViewChild('nameInput') set nameInput(inp: ElementRef) {
    if(!inp) return;
    inp.nativeElement.focus();
  }

  item: Purchase;
  form: FormGroup;
  selectedRecord: Record;
  sub: Subscription;
  timeoutHandle: any;
  isCloned = false;
  isSaved = false;

  constructor(
    private titlecase: TitleCasePipe,
    private titleService: Title,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ns: NotificationService,
    private store: Store<RecordsState>,
  ) { }

  ngOnInit(): void {
    this.sub = this.store
      .pipe(select(selectRecord))
      .subscribe(rec => this.selectedRecord = rec);
    this.route.data.subscribe(data => this.item = data.purchase);

    this.form = this.initForm();
    this.titleService.setTitle(`${this.titlecase.transform(this.item.name)} | Shopping List`);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  get isDirty() {
    const { name, quantity } = this.form.value;
    return this.item.name === name && this.item.quantity === quantity ? false : true;
  }

  initForm() {
    return this.fb.group({
      name: [this.item.name, Validators.required],
      units: [{value: this.item.units, disabled: true}],
      quantity: [this.item.quantity, Validators.required]
    });
  }

  onSubmit() {
    const { name, quantity } = this.form.value;
    const updatedItem: Purchase = {
      ...this.item,
      name,
      quantity,
      editDate: Date.now()
    };

    clearTimeout(this.timeoutHandle);
    this.isSaved = true;
    this.timeoutHandle = setTimeout(() => {
      this.isSaved = false;
      this.item = updatedItem;
    }, 1000);

    this.store.dispatch(new UpdateRecord({
      ...this.selectedRecord,
      updateDate: Date.now(),
      shoppingList: this.selectedRecord.shoppingList
        .map(it => it.id === updatedItem.id ? Object.assign({}, updatedItem) : it)
    }));
  }

  cloneItem() {
    const clonedItem: Purchase = {
      ...this.item,
      id: uuidv4(),
      copy: true
    };

    clearTimeout(this.timeoutHandle);
    this.isCloned = true;
    this.timeoutHandle = setTimeout(() => this.isCloned = false, 1000);

    this.store.dispatch(new UpdateRecord({
      ...this.selectedRecord,
      updateDate: Date.now(),
      shoppingList: [...this.selectedRecord.shoppingList, clonedItem]
    }));
  }

  removeItem() {
    this.ns.onRemove(this.item, this.selectedRecord.name)
      .pipe(take(1))
      .subscribe(val => {
        if (!val) return;

        this.store.dispatch(new UpdateRecord({
          ...this.selectedRecord,
          updateDate: Date.now(),
          shoppingList: this.selectedRecord.shoppingList.filter(it => this.item.id !== it.id)
        }));

        this.router.navigate(['/home', 'records']);
      });
  }

}
