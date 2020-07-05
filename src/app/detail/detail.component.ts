import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Purchase, ShoppingService } from '../shared/shopping.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  item: Purchase;

  constructor(
    public shoppingService: ShoppingService,
    private titleCasePipe: TitleCasePipe,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        const item = this.shoppingService.list.find(item => item.id === +params.id)

        if(!item) {
          this.item = null;
          this.router.navigate(['list']);
          return;
        };

        this.item = item;
        this.titleService
          .setTitle(`${this.titleCasePipe.transform(this.item.name)} | Shopping List`);
      });
  }

  toEdit() {
    this.route.queryParams
      .subscribe(query => {
        if (+query.allowEdit) {
          this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'merge' });
        } else {
          this.router.navigate(['list'], { queryParams: { message: 'edit-denied'} });
        }
      });
  }
}
