import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewChecked {

  listName = 'list name';
  dropdown = false;

  constructor(
    private cdRef:ChangeDetectorRef,
    public auth: AuthService
  ) { }

  ngOnInit(): void { }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  calcWidth(mask: HTMLElement, maxWidth = 500) {
    return maxWidth > mask.offsetWidth ? mask.offsetWidth : maxWidth;
  }

}
