import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingService } from '../shared/shopping.service';
import { NotificationService } from '../shared/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('name') name: ElementRef;
  @ViewChild('quantity') quantity: ElementRef;

  option = 'amount';

  constructor(
    public shoppingService: ShoppingService,
    private titleService: Title,
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
    this.titleService
      .setTitle(`Add item to ${this.shoppingService.listName.toLowerCase()} | Shopping List`);
  }

  create() {
    const name: string = this.name.nativeElement.value;
    const val: number = this.quantity.nativeElement.value;

    const quantity: string = this.option === 'amount' ? `${val}`
    : this.option === 'weight' && val < 1000 ? `${val}g` : `${val / 1000}kg`;

    if (!name.trim()) {
      this.notifService.onEmpty('name');
      this.name.nativeElement.focus();
      return;
    };

    this.shoppingService.addItem({
      id: Date.now(),
      name,
      quantity,
      option: this.option
    });

    this.name.nativeElement.value = '';
    this.quantity.nativeElement.value = '';
  }
}
