import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Store } from '@ngrx/store';
import { UserState } from './state/user/user.reducer';
import { LoadUser } from './state/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private store: Store<UserState>
  ) { }

  ngOnInit(): void {
    if (this.auth.userId) {
      this.store.dispatch(new LoadUser(this.auth.userId));
    }
  }

}
