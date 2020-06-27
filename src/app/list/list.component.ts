import { Component, OnInit, OnDestroy } from '@angular/core';
import { Purchase, ShoppingService } from '../shared/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  list: Purchase[];
  clonedItem: Purchase;
  editableItem: Purchase;
  timeoutHandle: any;
  sub: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.sub = this.shoppingService.getShoppingList()
      .subscribe(list => this.list = list);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  edit(item: Purchase) {
    this.editableItem = null;
    this.shoppingService.editItem(item);
  }

  clone(item: Purchase) {
    clearTimeout(this.timeoutHandle);
    this.clonedItem = item;
    this.timeoutHandle = setTimeout(() => this.clonedItem = null, 1000);
    this.shoppingService.cloneItem(item);
  }

  remove(itemId: number) {
    this.shoppingService.removeItem(itemId);
  }

  isCloned(item: Purchase) {
    return this.clonedItem === item;
  }

  isEditable(item: Purchase) {
    return this.editableItem === item;
  }
}
