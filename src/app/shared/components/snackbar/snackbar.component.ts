import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import messages from '../../utils/messages';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  message = '';
  timeoutHandle: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(query => {
        clearTimeout(this.timeoutHandle);

        if (messages[query.message]) {
          this.message = messages[query.message];
        }

        this.timeoutHandle = setTimeout(() => this.message = '', 5000);
      });
  }

  close() {
    clearTimeout(this.timeoutHandle);
    this.message = '';
  }
}
