import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';

export interface Purchase {
  id: number
  name: string
  quantity: string
  option: string
  copy?: boolean
  editDate?: Date
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  list = new BehaviorSubject<Purchase[]>([]);

  constructor(private notifService: NotificationService) { }

  getShoppingList() {
    return this.list.asObservable();
  }

  addItem(item: Purchase) {
    this.list.next([...this.list.getValue(), item]);
  }

  editItem(item: Purchase) {
    item.editDate = new Date();
    this.list.next(this.list.getValue());
  }

  cloneItem(item: Purchase) {
    this.list.next([
      ...this.list.getValue(),
      {
        ...item,
        id: Date.now(),
        copy: true
      }
    ]);
  }

  removeItem(id: number) {
    this.list.next(this.list.getValue().filter(item => item.id !== id));
  }
}
