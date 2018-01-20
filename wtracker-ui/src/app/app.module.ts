import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WodComponent } from './wod/wod.component';
import { WodService } from './wod/wod-service';
import {SortPipe} from './sort-pipe';

const appRoutes: Routes = [
    { path: 'wtracker', component: WodComponent, pathMatch: 'full' },
    { path: 'wtracker/:id', component: WodComponent },
    { path: '', redirectTo: '/wtracker', pathMatch: 'full' },

  //  { path: '**', component: WodComponent  }
];

@NgModule({
  declarations: [
    AppComponent,
    WodComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  exports: [
    SortPipe
  ],
  providers: [WodService],
  bootstrap: [AppComponent]
})
export class AppModule {}
