import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotificationService, MessageCodes } from 'src/app/shared/services/notification.service';
import { RecordDetailsPageComponent } from './record-details-page.component';

@Injectable({
  providedIn: 'root'
})
export class RecordDetailsPageGuard implements CanDeactivate<RecordDetailsPageComponent> {

  constructor(private ns: NotificationService) { }

  canDeactivate(
    component: RecordDetailsPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> {
    return component.isDirty ? this.ns.confirm(MessageCodes.canDeactivatePage) : of(true);
  }

}
