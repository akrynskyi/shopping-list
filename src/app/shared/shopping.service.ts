import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';

export interface Purchase {
  id: number,
  name: string,
  quantity: string,
  option: string,
  copy?: boolean,
  editDate?: Date
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  listName = 'New list';
  list = new BehaviorSubject<Purchase[]>([]);

  constructor(private notifService: NotificationService) { }

  getShoppingList() {
    return this.list.asObservable();
  }

  addItem(item: Purchase) {
    this.list.next([...this.list.getValue(), item]);
    this.notifService.onAdd(item.name);
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

  removeItem(item: Purchase) {
    if(this.notifService.onRemove(item)) {
      this.list.next(this.list.getValue().filter(it => it.id !== item.id));
    }
  }
}
