import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';
import { Purchase } from 'src/app/shared/models/purchase.model';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  constructor(
    private titleCasePipe: TitleCasePipe,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.titleService
    //   .setTitle(`${this.titleCasePipe.transform(this.shoppingService.listName)} | Shopping List`);
  }

  toDetail(item: Purchase) {
    this.router.navigate(['../home', 'details', item.name, item.id]);
  }

}
