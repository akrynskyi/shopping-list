import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from './models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseResolver implements Resolve<Purchase> {

  constructor() { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Purchase | Observable<Purchase> | Promise<Purchase> {
    return null;
  }
}
