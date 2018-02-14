import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WodComponent } from './wod/wod.component';
import { WodResultsComponent } from './wod-results/wod-results.component';
import { AthleteComponent } from './athlete/athlete.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes: Routes = [
    { path: 'wtracker/wods', component: WodComponent, pathMatch: 'full' },
    { path: 'wtracker/wods/:id', component: WodComponent },
    { path: 'wtracker/wods/:id/results', component: WodResultsComponent },
    { path: 'wtracker/athletes', component: AthleteComponent, pathMatch: 'full' },
    { path: 'wtracker/athletes/:id', component: AthleteComponent, pathMatch: 'full' },
    { path: '', redirectTo: '/wtracker/wods', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
