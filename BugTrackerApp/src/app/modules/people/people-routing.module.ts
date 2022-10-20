import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleHomeComponent } from './components/people-home/people-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: PeopleHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
