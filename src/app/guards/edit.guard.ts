import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EditComponent } from '../list/edit/edit.component';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanDeactivate<EditComponent> {

  canDeactivate(
    component: EditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!component.isEdited) return true;
    return confirm(
      `💾 Do you really want to leave edit ${component.item.name}? You didn\'t save your changes yet!`
    );
  }
}
