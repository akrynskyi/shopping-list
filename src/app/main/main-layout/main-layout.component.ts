import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/state/user/user.model';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/state';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  user$: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectUser));
  }

}
