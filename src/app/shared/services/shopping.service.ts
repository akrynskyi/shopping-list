import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  listName = 'Fruits and berries';
  list: Purchase[] = [
    {
      id: 1,
      name: 'cheery',
      quantity: '1.5kg',
      option: 'weight',
    },
    {
      id: 2,
      name: 'orange',
      quantity: '2.5kg',
      option: 'weight',
    },
    {
      id: 3,
      name: 'apple',
      quantity: '1kg',
      option: 'weight',
    },
    {
      id: 4,
      name: 'strawberry',
      quantity: '3.7kg',
      option: 'weight',
    },
    {
      id: 5,
      name: 'blackberry',
      quantity: '2kg',
      option: 'weight',
    },
    {
      id: 6,
      name: 'plum',
      quantity: '1.8kg',
      option: 'weight',
    },
    {
      id: 7,
      name: 'pear',
      quantity: '900g',
      option: 'weight',
    },
    {
      id: 8,
      name: 'raspberry',
      quantity: '4kg',
      option: 'weight',
    },
    {
      id: 9,
      name: 'grape',
      quantity: '3.5kg',
      option: 'weight',
    },
    {
      id: 10,
      name: 'merry',
      quantity: '5kg',
      option: 'weight',
    }
  ];

  constructor(private notifService: NotificationService) { }

  getItem(id: number): Purchase {
    return this.list.find(item => item.id === id);
  }

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
    if (this.notifService.onRemove(item, this.listName)) {
      this.list = this.list.filter(it => it.id !== item.id);
      return true;
    }
    return false;
  }
}
