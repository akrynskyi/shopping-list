import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Purchase, ShoppingService } from '../shared/shopping.service';
import { TitleCasePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @ViewChild('editInp') set editInput(inp: ElementRef) {
    if(!inp) return;
    inp.nativeElement.focus();
  }

  item: Purchase;
  isCloned = false;
  isEditable = false;
  newName: string;
  timeoutHandle: any;

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
          this.router.navigate(['/list']);
          return;
        };

        this.item = item;
        this.titleService
          .setTitle(`${this.titleCasePipe.transform(this.item.name)} | Shopping List`);
      });
  }

  edit() {
    this.isEditable = true;
    this.newName = this.item.name;
  }

  save() {
    this.isEditable = false;

    if(this.newName === this.item.name) return;

    this.item.name = this.newName;
    this.item.editDate = new Date();
    this.item.copy = false;

    this.titleService
      .setTitle(`${this.titleCasePipe.transform(this.item.name)} | Shopping List`);
  }

  clone() {
    clearTimeout(this.timeoutHandle);
    this.isCloned = true;
    this.timeoutHandle = setTimeout(() => this.isCloned = false, 1000);
    this.shoppingService.cloneItem(this.item);
  }

  remove() {
    if(!this.shoppingService.removeItem(this.item)) return;
    this.router.navigate(['/list']);
  }
}
