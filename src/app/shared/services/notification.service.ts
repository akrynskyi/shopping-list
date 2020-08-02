import { Injectable } from '@angular/core';
import { Purchase } from './shopping.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notify: Subject<boolean> = new Subject();
  message: Subject<string> = new Subject();

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
    this.message.next(msgCode);
    return this.notify.asObservable();
  }
}
