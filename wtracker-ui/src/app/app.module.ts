import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WodComponent } from './wod/wod.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { WodService } from './wod/wod-service';
import { SortPipe } from './sort-pipe';

@NgModule({
  declarations: [
    AppComponent,
    WodComponent,
    PageNotFoundComponent,
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
