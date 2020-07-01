import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Purchase, ShoppingService } from '../shared/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  @ViewChild('editInp') set editInput(inp: ElementRef) {
    if(!inp) return;
    inp.nativeElement.focus();
  }

  shoppingList: Purchase[];
  clonedItem: Purchase;
  editableItem: Purchase;
  newName: string;
  timeoutHandle: any;
  sub: Subscription;

  constructor(public shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.sub = this.shoppingService.getShoppingList()
      .subscribe(list => this.shoppingList = list);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  edit(item: Purchase) {
    this.editableItem = item;
    this.newName = item.name;
  }

  save(item: Purchase) {
    this.editableItem = null;

    if(this.newName === item.name) return;
    item.name = this.newName;
    item.editDate = new Date();
    item.copy = false;
  }

  clone(item: Purchase) {
    clearTimeout(this.timeoutHandle);
    this.clonedItem = item;
    this.timeoutHandle = setTimeout(() => this.clonedItem = null, 1000);
    this.shoppingService.cloneItem(item);
  }

  remove(item: Purchase) {
    this.shoppingService.removeItem(item);
  }

  isCloned(item: Purchase) {
    return this.clonedItem === item;
  }

  isEditable(item: Purchase) {
    return this.editableItem === item;
  }
}
