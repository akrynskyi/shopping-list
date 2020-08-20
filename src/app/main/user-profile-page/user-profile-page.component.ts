import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/state/user/user.reducer';
import { Observable } from 'rxjs';
import { User } from 'src/app/state/user/user.model';
import { selectUser } from 'src/app/state';
import { UpdateUser } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  user$: Observable<User>;
  username: string;
  edit = false;

  constructor(private store: Store<UserState>) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectUser));
  }

  editUser({username}) {
    this.username = username;
    this.edit = true;
  }

  updateUser(user: User) {
    this.edit = false;

    if (this.username === user.username) return;

    this.store.dispatch(new UpdateUser({
      ...user,
      username: this.username
    }));
  }

}
