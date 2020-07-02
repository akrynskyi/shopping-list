import { Component, OnInit } from '@angular/core';
import { ShoppingService, Purchase } from '../shared/shopping.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  timeoutHandle: any;

  constructor(
    public shoppingService: ShoppingService,
    private titleCasePipe: TitleCasePipe,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService
      .setTitle(`${this.titleCasePipe.transform(this.shoppingService.listName)} | Shopping List`);
  }

  toDetail(item: Purchase) {
    this.router.navigate(['/detail', item.name, item.id]);
  }

}
