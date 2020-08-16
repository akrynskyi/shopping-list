import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from '.';
import { UserEffects } from './user/user.effects';
import { RecordsEffects } from './records/records.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    EffectsModule.forRoot([UserEffects, RecordsEffects])
  ]
})
export class StateModule { }
