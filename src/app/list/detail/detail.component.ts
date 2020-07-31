import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';
import { Purchase, ShoppingService } from '../../shared/services/shopping.service';

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
    this.route.data
      .subscribe(data => {
        this.item = data.purchase;

        if (!data.purchase) {
          this.router.navigate(['list']);
        };

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
