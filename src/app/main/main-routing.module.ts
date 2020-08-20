import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { CreateRecordPageComponent } from './create-record-page/create-record-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { RecordDetailsPageComponent } from './record-details-page/record-details-page.component';
import { PurchaseResolver } from '../shared/purchase.resolver';
import { RecordDetailsPageGuard } from './record-details-page/record-details-page.guard';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: OverviewPageComponent
      },
      {
        path: 'create',
        component: CreateRecordPageComponent
      },
      {
        path: 'records',
        component: RecordsPageComponent
      },
      {
        path: 'details/:name/:id',
        component: RecordDetailsPageComponent,
        resolve: { purchase: PurchaseResolver },
        canDeactivate: [RecordDetailsPageGuard],
      },
      {
        path: 'profile/:name',
        component: UserProfilePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
