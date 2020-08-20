import { NgModule } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { StateModule } from './state/state.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { FullscreenLoaderComponent } from './shared/components/fullscreen-loader/fullscreen-loader.component';
import { AuthInterceptor } from './auth/auth.interceptor';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    SnackbarComponent,
    PageNotFoundComponent,
    FullscreenLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StateModule
  ],
  providers: [
    Title,
    TitleCasePipe,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
