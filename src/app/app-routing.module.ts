import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './list/detail/detail.component';
import { PlaceholderComponent } from './list/placeholder/placeholder.component';
import { EditComponent } from './list/edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { EditGuard } from './shared/guards/edit.guard';
import { PurchaseResolver } from './shared/purchase.resolver';
import { LoginLayoutComponent } from './shared/layouts/login-layout/login-layout.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: UserAuthComponent
      }
    ]
  },
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
