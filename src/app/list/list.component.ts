import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Purchase } from '../form/form.component';

export interface Action {
  elemId: number
  type: string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: Purchase[];
  @Output() action = new EventEmitter<Action>();

  clonedItem: Purchase;
  timeoutHandle: any;

  constructor() { }

  ngOnInit(): void {
  }

  remove(elemId: number) {
    this.action.emit({
      elemId,
      type: 'remove'
    });
  }

  clone(elemId: number, item: Purchase) {
    clearTimeout(this.timeoutHandle);

    this.clonedItem = item;
    this.timeoutHandle = setTimeout(() => this.clonedItem = null, 1000);

    this.action.emit({
      elemId,
      type: 'clone'
    });
  }

  isCloned(item: Purchase) {
    return this.clonedItem === item;
  }
}
