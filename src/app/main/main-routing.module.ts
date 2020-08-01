import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

// const routes: Routes = [
//     path: 'home',
//     component: MainLayoutComponent,
//     children: [
//       {
//         path: '',
//         component: CreateComponent
//       },
//       {
//         path: 'add',
//         component: FormComponent
//       },
//       {
//         path: 'list',
//         component: ListComponent,
//         canActivate: [AuthGuard],
//         children: [
//           {
//             path: '',
//             component: PlaceholderComponent
//           },
//           {
//             path: ':name/:id',
//             component: DetailComponent,
//             resolve: { purchase: PurchaseResolver }
//           },
//           {
//             path: ':name/:id/edit',
//             component: EditComponent,
//             canDeactivate: [EditGuard],
//             resolve: { purchase: PurchaseResolver }
//           }
//         ]
//       },

//     ]
//   },
// ];

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: OverviewPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
