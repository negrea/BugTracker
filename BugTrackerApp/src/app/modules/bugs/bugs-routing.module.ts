import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugsHomeComponent } from './components/bugs-home/bugs-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: BugsHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BugsRoutingModule {}
