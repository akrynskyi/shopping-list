import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import messages from '../../utils/messages';

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
        clearTimeout(this.timeoutHandle);

        if (messages[query.message]) {
          this.confirmAction = false;
          this.onMessage(messages[query.message]);
        }

        this.timeoutHandle = setTimeout(this.reset.bind(this), 5000);
      });

    this.sub = this.ns.message
      .subscribe(key => {
        if (messages[key]) {
          this.onMessage(messages[key], 'confirm');
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onMessage(msg: string, type?: string) {
    this.message = null;
    this.message = msg;
    this.snackbar = true;

    if (type === 'confirm') {
      this.confirmAction = true;
      this.overlay = true;
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
