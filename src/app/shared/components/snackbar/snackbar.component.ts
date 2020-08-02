import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import messages from '../../utils/messages';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  message = '';
  confirmAction = false;
  timeoutHandle: any;

  constructor(
    private route: ActivatedRoute,
    private ns: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(query => {
        clearTimeout(this.timeoutHandle);

        if (messages[query.message]) {
          this.message = messages[query.message];
        }

        this.timeoutHandle = setTimeout(() => this.message = '', 5000);
      });

    this.ns.message
      .subscribe(key => {
        this.confirmAction = true;

        if (messages[key]) {
          this.message = messages[key]
        }
      });
  }

  confirm() {
    this.ns.notify.next(true);
    this.confirmAction = false;
    this.message = '';
  }

  close() {
    if (this.confirmAction) {
      this.ns.notify.next(false);
      this.confirmAction = false;
    }

    clearTimeout(this.timeoutHandle);
    this.message = '';
  }
}
