import { Injectable } from '@angular/core';
import { Purchase } from './shopping.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  onAdd(name: string) {
    alert(`📝 You add ${name.toLowerCase()} to your list`);
  }

  onEmpty(value: string) {
    alert(`💡 Field ${value.toLowerCase()} can't be empty...`);
  }

  onRemove(item: Purchase) {
    return confirm(
      `🗑️ Are you sure to delete ${item.name.toLowerCase()} from your list? ${item.copy ? '[Copy]' : '[Original]'}`
    );
  }
}
