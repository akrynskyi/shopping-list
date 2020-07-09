import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Purchase, ShoppingService } from '../../shared/shopping.service';
import { TitleCasePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  newName: string;
  newQuantity: string;
  isCloned = false;
  timeoutHandle: any;

  constructor(
    public shoppingService: ShoppingService,
    private titleCasePipe: TitleCasePipe,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.item = data.purchase;

        if (!data.purchase) {
          this.router.navigate(['list']);
        };

        this.newName = this.item.name;
        this.newQuantity = this.item.quantity;

        this.titleService
          .setTitle(`${this.titleCasePipe.transform(this.item.name)} | Shopping List`);
      });
  }

  get isEdited() {
    if (
      this.newName === this.item.name
      && this.newQuantity === this.item.quantity
    ) return false;

    return true;
  }

  save() {
    if (!this.isEdited) return;

    this.item.name = this.newName;
    this.item.quantity = this.newQuantity;
    this.item.editDate = new Date();
    this.item.copy = false;

    this.router.navigate(['list', this.item.name, this.item.id], { queryParamsHandling: 'merge'});
  }

  clone() {
    clearTimeout(this.timeoutHandle);
    this.isCloned = true;
    this.timeoutHandle = setTimeout(() => this.isCloned = false, 1000);
    this.shoppingService.cloneItem(this.item);
  }

  remove() {
    if (!this.shoppingService.removeItem(this.item)) return;
    this.router.navigate(['list']);
    this.titleService
      .setTitle(`${this.titleCasePipe.transform(this.shoppingService.listName)} | Shopping List`);
  }

  prevRoute() {
    this.location.back();
  }
}
