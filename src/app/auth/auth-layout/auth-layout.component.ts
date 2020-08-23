import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/state/user/user.reducer';
import { selectUserLoading } from 'src/app/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  userLoaded$: Observable<boolean>;

  constructor(private store: Store<UserState>) { }

  ngOnInit(): void {
    this.userLoaded$ = this.store.pipe(select(selectUserLoading));
  }

}
