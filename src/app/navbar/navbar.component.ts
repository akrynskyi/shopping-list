import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login(true);
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { message: 'login' },
        queryParamsHandling: 'merge'
      }
    );
  }

  onLogout() {
    this.authService.login(false);

    this.router.navigate(
      [],
      { relativeTo: this.route,
        queryParams: { message: 'logout' },
        queryParamsHandling: 'preserve'
      }
    );

    if(this.router.url.includes('/list')) {
      this.router.navigate(
        [''],
        {
          queryParams: { message: 'logout' }
        }
      );
    }
  }

}
