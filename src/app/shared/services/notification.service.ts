import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';

export interface NotifMessage {
  type: 'default' | 'confirm',
  code: string,
  text?: string
}

export enum MessageCodes {
  withText = 'with:text',
  canDeactivateAuth = 'auth:can-deactivate',
  canDeactivatePage = 'page:can-deactivate'
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notify: Subject<boolean> = new Subject();
  message: Subject<NotifMessage> = new Subject();

  constructor() { }

  onAdd(itemName: string, listName: string) {
    this.message.next({
      type: 'default',
      code: MessageCodes.withText,
      text: `📝 You add ${itemName.toLowerCase()} to ${listName.toLowerCase()}`
    });
  }

  onRemove(item: Purchase, listName: string) {
    this.message.next({
      type: 'confirm',
      code: MessageCodes.withText,
      text: `🗑️ Are you sure to delete ${item.name.toLowerCase()} from ${listName.toLowerCase()}? ${item.copy ? '[Copy]' : '[Original]'}`
    });

    return this.notify.asObservable();
  }

  confirm(msgCode: string): Observable<boolean> {
    this.message.next({type: 'confirm', code: msgCode});
    return this.notify.asObservable();
  }

}
