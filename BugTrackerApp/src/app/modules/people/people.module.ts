import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleRoutingModule } from './people-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { peopleReducer } from './store/people.reducer';
import { StoreModule } from '@ngrx/store';
import { PeopleHomeComponent } from './components/people-home/people-home.component';
import { PeopleEffects } from './store/people.effects';
import { EffectsModule } from '@ngrx/effects';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PeopleTableComponent } from './components/people-table/people-table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PeopleRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('peopleState', peopleReducer),
    EffectsModule.forFeature([PeopleEffects]),
  ],
  declarations: [
    PeopleHomeComponent,
    PersonFormComponent,
    PeopleTableComponent,
  ],
  providers: [],
  exports: [],
})
export class PeopleModule {}
