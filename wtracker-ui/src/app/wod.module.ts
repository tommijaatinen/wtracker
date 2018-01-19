import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { WodComponent } from './wod.component';
import { WodService } from './wod-service';
import {SortPipe} from './sort-pipe';


@NgModule({
  declarations: [
    WodComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    SortPipe
  ],
  providers: [WodService],
  bootstrap: [WodComponent]
})
export class WodModule { }
