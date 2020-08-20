import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FromNowPipe } from './pipes/from-now.pipe';
import { BlurDirective } from './directives/blur.directive';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { FullscreenLoaderComponent } from './components/fullscreen-loader/fullscreen-loader.component';

@NgModule({
  declarations: [
    FromNowPipe,
    BlurDirective,
    SnackbarComponent,
    FullscreenLoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FromNowPipe,
    BlurDirective,
    SnackbarComponent,
    FullscreenLoaderComponent,
  ]
})
export class SharedModule { }
