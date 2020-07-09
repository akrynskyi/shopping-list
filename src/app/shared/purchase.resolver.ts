import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Purchase, ShoppingService } from './shopping.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseResolver implements Resolve<Purchase> {

  constructor(private shoppingService: ShoppingService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Purchase | Observable<Purchase> | Promise<Purchase> {
    const item = this.shoppingService.getItem(+route.paramMap.get('id'));
    if (!item) return null;
    return item;
  }
}
