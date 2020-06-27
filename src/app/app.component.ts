import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shared/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isEmpty: number;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.shoppingService.getShoppingList()
      .subscribe(list => this.isEmpty = list.length);
  }

}
