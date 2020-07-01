import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shared/shopping.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(public shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

}
