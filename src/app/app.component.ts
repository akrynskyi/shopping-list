import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Store } from '@ngrx/store';
import { LoadUser } from './state/user/user.actions';
import { LoadRecords } from './state/records/records.actions';
import { AppState } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    if (this.auth.userId) {
      this.store.dispatch(new LoadUser(this.auth.userId));
      this.store.dispatch(new LoadRecords(this.auth.userId));
    }
  }

}
