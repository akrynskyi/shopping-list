import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

export interface Purchase {
  id: number
  name: string
  quantity: string
  option: string
  copy?: boolean
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('name') name: ElementRef;
  @ViewChild('quantity') quantity: ElementRef;
  @ViewChild('select') select: ElementRef;

  @Output() created = new EventEmitter<Purchase>();
  option = 'amount';

  constructor() { }

  ngOnInit(): void {
  }

  pick() {
    this.option = this.select.nativeElement.value;
  }

  create() {
    const name: string = this.name.nativeElement.value;
    const val: number = this.quantity.nativeElement.value;

    const quantity: string = this.option === 'amount' ? `${val}`
    : this.option === 'weight' && val < 1000 ? `${val}g` : `${val / 1000}kg`;

    if(!name.trim() && !val) return;

    this.created.emit({
      id: Date.now(),
      name,
      quantity,
      option: this.option
    });

    this.name.nativeElement.value = '';
    this.quantity.nativeElement.value = '';
  }
}
