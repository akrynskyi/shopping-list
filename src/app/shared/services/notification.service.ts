import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';

export interface NotifMessage {
  type: 'default' | 'confirm',
  code: string
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notify: Subject<boolean> = new Subject();
  message: Subject<NotifMessage> = new Subject();

  constructor() { }

  onAdd(itemName: string, listName: string) {
    alert(`📝 You add ${itemName.toLowerCase()} to ${listName.toLowerCase()}`);
  }

  onEmpty(value: string) {
    alert(`💡 Field ${value.toLowerCase()} can't be empty...`);
  }

  onRemove(item: Purchase, listName: string) {
    return confirm(
      `🗑️ Are you sure to delete ${item.name.toLowerCase()} from ${listName.toLowerCase()}? ${item.copy ? '[Copy]' : '[Original]'}`
    );
  }

  confirm(msgCode: string): Observable<boolean> {
    this.message.next({type: 'confirm', code: msgCode});
    return this.notify.asObservable();
  }
}
