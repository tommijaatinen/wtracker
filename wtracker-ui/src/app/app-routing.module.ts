import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { WodComponent } from './wod/wod.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes: Routes = [
    { path: 'wtracker', component: WodComponent, pathMatch: 'full' },
    { path: 'wtracker/:id', component: WodComponent },
    { path: '', redirectTo: '/wtracker', pathMatch: 'full' },
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