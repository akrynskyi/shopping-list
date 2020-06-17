import { Component } from '@angular/core';
import { Purchase } from './form/form.component';
import { Action } from './list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  list: Purchase[] = [];

  constructor() { }

  getItem(item: Purchase) {
    this.list.push(item);
  }

  remove(id: number) {
    this.list = this.list.filter(item => item.id !== id);
  }

  clone(id: number) {
    const it = this.list.find(item => item.id === id);

    this.list.push({
      ...it,
      id: Date.now(),
      copy: true
    });
  }

  actionHandle(action: Action) {
    switch (action.type) {
      case 'remove':
        this.remove(action.elemId);
        break;

      case 'clone':
        this.clone(action.elemId);
        break;

      default:
        break;
    }
  }
}
