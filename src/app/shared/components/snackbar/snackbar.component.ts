import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import messages from './snackbar.messages';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {

  message = '';
  overlay = false;
  snackbar = false;
  confirmAction = false;
  timeoutHandle: any;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ns: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(query => {
        if (messages[query.message]) {
          this.onMessage(messages[query.message]);
        }
      });

    this.sub = this.ns.message
      .subscribe(msg => {
        if (messages[msg.code]) {
          this.onMessage(messages[msg.code], msg.type);
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onMessage(msg: string, type?: string) {
    clearTimeout(this.timeoutHandle);
    this.message = null;
    this.message = msg;
    this.snackbar = true;

    if (type === 'confirm') {
      this.confirmAction = true;
      this.overlay = true;
    } else {
      this.confirmAction = false;
      this.timeoutHandle = setTimeout(this.reset.bind(this), 5000);
    }
  }

  reset() {
    this.snackbar = false;
    this.overlay = false;
  }

  confirm() {
    this.ns.notify.next(true);
    this.reset();
  }

  close() {
    if (this.confirmAction) {
      this.ns.notify.next(false);
    }

    clearTimeout(this.timeoutHandle);
    this.reset();
  }
}
