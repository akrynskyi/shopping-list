import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './list/detail/detail.component';
import { PlaceholderComponent } from './list/placeholder/placeholder.component';
import { EditComponent } from './list/edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { EditGuard } from './guards/edit.guard';
import { PurchaseResolver } from './shared/purchase.resolver';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent
  },
  {
    path: 'add',
    component: FormComponent
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PlaceholderComponent
      },
      {
        path: ':name/:id',
        component: DetailComponent,
        resolve: { purchase: PurchaseResolver }
      },
      {
        path: ':name/:id/edit',
        component: EditComponent,
        canDeactivate: [EditGuard],
        resolve: { purchase: PurchaseResolver }
      }
    ]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
