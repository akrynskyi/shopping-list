import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { Purchase } from './models/purchase.model';
import { selectShoppingListItem } from '../state';
import { RecordsState } from '../state/records/records.reducer';

@Injectable({
  providedIn: 'root'
})
export class PurchaseResolver implements Resolve<Purchase> {

  constructor(private store: Store<RecordsState>) { }

  resolve(route: ActivatedRouteSnapshot): Purchase {
    let item: Purchase;

    this.store.pipe(
      select(selectShoppingListItem, { id: +route.paramMap.get('id') }),
      take(1)
    ).subscribe(it => item = it);

    return item;
  }

}
