import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(public ns: NotificationService) { }

  ngOnInit(): void {
  }

}
