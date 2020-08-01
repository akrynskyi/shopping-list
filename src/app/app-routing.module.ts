import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginUserComponent },
      { path: 'register', component: RegisterUserComponent }
    ]
  },
  {
    path: 'home',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
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
