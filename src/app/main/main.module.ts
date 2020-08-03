import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { FromNowPipe } from '../shared/pipes/from-now.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { CreateRecordPageComponent } from './create-record-page/create-record-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';

@NgModule({
  declarations: [
    FromNowPipe,
    NavbarComponent,
    MainLayoutComponent,
    OverviewPageComponent,
    CreateRecordPageComponent,
    RecordsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
