import { NgModule } from '@angular/core';
import { PersonFullNamePipe } from './pipes/full-name.pipe';

@NgModule({
  imports: [],
  declarations: [PersonFullNamePipe],
  providers: [],
  exports: [PersonFullNamePipe],
})
export class SharedPeopleModule {}
