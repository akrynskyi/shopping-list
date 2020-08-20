import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { CreateRecordPageComponent } from './create-record-page/create-record-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { RecordDetailsPageComponent } from './record-details-page/record-details-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MainLayoutComponent,
    OverviewPageComponent,
    CreateRecordPageComponent,
    RecordsPageComponent,
    RecordDetailsPageComponent,
    UserProfilePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
