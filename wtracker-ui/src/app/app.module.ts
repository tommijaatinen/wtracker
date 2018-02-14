import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FinDateParserFormatter } from './fin-date-parser-formatter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WodComponent } from './wod/wod.component';
import { WodResultsComponent } from './wod-results/wod-results.component';
import { AthleteComponent } from './athlete/athlete.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { WodService } from './wod/wod-service';
import { AthleteService } from './athlete/athlete-service';
import { SortPipe } from './sort-pipe';

@NgModule({
  declarations: [
    AppComponent,
    WodComponent,
    WodResultsComponent,
    AthleteComponent,
    PageNotFoundComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  exports: [
    SortPipe
  ],
  providers: [
        WodService,
        AthleteService,
        { provide: NgbDateParserFormatter, useClass: FinDateParserFormatter }
 ],
  bootstrap: [AppComponent]
})
export class AppModule {}
