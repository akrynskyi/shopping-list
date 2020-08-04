import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  onLogin() {
    // this.authService.login(true);
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { message: 'login' },
      }
    );
  }

  onLogout() {
    // this.authService.login(false);
    this.router.navigate(
      [],
      { relativeTo: this.route,
        queryParams: { message: 'logout' },
      }
    );

    if (this.router.url.includes('/list')) {
      this.router.navigate(
        [''],
        {
          queryParams: { message: 'logout' }
        }
      );
    }
  }
}
