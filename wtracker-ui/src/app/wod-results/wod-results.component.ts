import { Component, OnInit, Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { AthleteService } from '../athlete/athlete-service';
import { Wod } from '../model/wod';
import { Athlete } from '../model/athlete'
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './wod-results.component.html',
  styleUrls: ['./wod-results.component.css'],
})

@Injectable()
export class WodResultsComponent implements OnInit { 

    private id: String;
 
    constructor(private route: ActivatedRoute, private athleteService: AthleteService) {}

    ngOnInit() : void {
        this.route.params.subscribe(r => this.id = r['id']);
    }
}