import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

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
  list: Purchase[] = [];

  constructor(private notifService: NotificationService) { }

  addItem(item: Purchase) {
    this.list.push(item);
    this.notifService.onAdd(item.name, this.listName);
  }

  cloneItem(item: Purchase) {
    this.list.push({
      ...item,
      id: Date.now(),
      copy: true
    });
  }

  removeItem(item: Purchase) {
    if(this.notifService.onRemove(item, this.listName)) {
      this.list = this.list.filter(it => it.id !== item.id);
      return true;
    }
    return false;
  }
}
