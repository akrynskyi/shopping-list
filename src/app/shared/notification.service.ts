import { Injectable, OnInit } from '@angular/core';
import { Purchase } from './shopping.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

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
}
