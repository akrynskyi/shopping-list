import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MainLayoutComponent,
    OverviewPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
