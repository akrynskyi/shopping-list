import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './list/edit/edit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './list/detail/detail.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { PlaceholderComponent } from './list/placeholder/placeholder.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { FromNowPipe } from './shared/pipes/from-now.pipe';
import { LoginLayoutComponent } from './shared/layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { LoginUserComponent } from './user-auth/login-user/login-user.component';
import { RegisterUserComponent } from './user-auth/register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    FromNowPipe,
    NavbarComponent,
    CreateComponent,
    DetailComponent,
    PlaceholderComponent,
    EditComponent,
    PageNotFoundComponent,
    SnackbarComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    UserAuthComponent,
    LoginUserComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    Title,
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
