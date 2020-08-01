import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../shared/services/shopping.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  constructor(
    public shoppingService: ShoppingService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Get started | Shopping List');
  }

  toAddPage() {
    this.router.navigate(['add']);
  }
}
