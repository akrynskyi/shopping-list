import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/state';
import { User } from 'src/app/state/user/user.model';
import { UserState } from 'src/app/state/user/user.reducer';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  user$: Observable<User>;

  constructor(private store: Store<UserState>) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectUser));
  }

}
