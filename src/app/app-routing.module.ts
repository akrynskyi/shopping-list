import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: CreateComponent },
  { path: 'add', component: FormComponent },
  {
    path: 'list',
    component: ListComponent,
    children: [
      { path: '', component: PlaceholderComponent },
      { path: ':name/:id', component: DetailComponent },
      { path: ':name/:id/edit', component: EditComponent }
    ]
  },
  { path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
