import { Component, OnInit } from '@angular/core';
import { ShoppingService, Purchase } from '../shared/shopping.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    public shoppingService: ShoppingService,
    private titleCasePipe: TitleCasePipe,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.titleService
      .setTitle(`${this.titleCasePipe.transform(this.shoppingService.listName)} | Shopping List`);
  }

  toDetail(item: Purchase, idx: number) {
    const query = { allowEdit: (idx + 1) % 2 === 0 ? 1 : 0 };
    this.router.navigate([item.name, item.id], { queryParams: query, relativeTo: this.route });
  }

}
