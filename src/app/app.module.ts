import { NgModule } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { FromNowPipe } from './shared/pipes/from-now.pipe';

import { AppComponent } from './app.component';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    FromNowPipe,
    PageNotFoundComponent,
    SnackbarComponent,
    AuthLayoutComponent,
    LoginUserComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    Title,
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
