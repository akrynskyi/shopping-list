import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent implements OnInit {

  message = '💡 No item selected';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(query => {
        if (query.message === 'edit-denied') {
          this.message = '🔒 You can not edit this item';
        } else {
          this.message = '💡 No item selected';
        }
      })
  }
}
