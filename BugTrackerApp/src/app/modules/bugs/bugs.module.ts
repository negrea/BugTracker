import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsRoutingModule } from './bugs-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { bugsReducer } from './store/bugs.reducer';
import { StoreModule } from '@ngrx/store';
import { BugsEffects } from './store/bugs.effects';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { BugsTableComponent } from './components/bugs-table/bugs-table.component';
import { BugsHomeComponent } from './components/bugs-home/bugs-home.component';
import { BugsService } from './services/bugs.service';
import { BugFormComponent } from './components/bug-form/bug-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BugsRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    StoreModule.forFeature('bugsState', bugsReducer),
    EffectsModule.forFeature([BugsEffects]),
  ],
  declarations: [BugsHomeComponent, BugsTableComponent, BugFormComponent],
  providers: [BugsService],
  exports: [],
})
export class BugsModule {}
