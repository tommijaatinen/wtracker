import { Component, OnInit, Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { AthleteService } from '../athlete/athlete-service';
import { Wod } from '../model/wod';
import { Athlete } from '../model/athlete'
import { Subject } from 'rxjs/Subject';
import { WodResult } from '../model/wod-result' 

@Component({
  templateUrl: './wod-results.component.html',
  styleUrls: ['./wod-results.component.css'],
})

@Injectable()
export class WodResultsComponent implements OnInit { 

    private id: String;
    
    
    results : WodResult[] = [
    {
        id: '',
        athleteId: '',
        weight: 20,
        time: 200,
        repetitions: 4
        }
    ]
 
    constructor(private route: ActivatedRoute, private athleteService: AthleteService) {}

    ngOnInit() : void {
        this.route.params.subscribe(r => {
            this.id = r['id'];
        });
    }
}