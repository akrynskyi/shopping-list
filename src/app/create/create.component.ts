import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shared/shopping.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    public shoppingService: ShoppingService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Get started | Shopping List');
  }

  toAddPage() {
    this.router.navigate(['/add']);
  }
}
