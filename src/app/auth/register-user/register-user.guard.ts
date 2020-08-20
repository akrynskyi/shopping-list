import { Injectable } from '@angular/core';
import { RegisterUserComponent } from './register-user.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NotificationService, MessageCodes } from 'src/app/shared/services/notification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserGuard implements CanDeactivate<RegisterUserComponent> {

  constructor(private ns: NotificationService) { }

  canDeactivate(
    component: RegisterUserComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return !component.form.pristine ? this.ns.confirm(MessageCodes.canDeactivateAuth) : true;
  }

}
