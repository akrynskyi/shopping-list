import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { FromNowPipe } from './pipes/from-now.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './list/detail/detail.component';
import { TitleCasePipe } from '@angular/common';
import { PlaceholderComponent } from './list/placeholder/placeholder.component';
import { EditComponent } from './list/edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

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
    SnackbarComponent
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
