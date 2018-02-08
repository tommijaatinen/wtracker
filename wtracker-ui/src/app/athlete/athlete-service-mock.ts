import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";

import { Athlete } from './athlete';

@Injectable()
export class AthleteServiceMock { 
    
    mockAthlete1: Athlete = { 
        id: '1', 
        firstName: 'firstName_1',
        lastName: 'lastName_1',
        gender: 'Male',
        weight: 80,
        dateOfBirth: new Date(),
        age: 1
    };

    mockAthlete2: Athlete = { 
        id: '2', 
        firstName: 'firstName_2',
        lastName: 'lastName_2',
        gender: 'Male',
        weight: 100,
        dateOfBirth: new Date(),
        age: 1
    };

    mockAthlete3: Athlete = { 
        id: '3', 
        firstName: 'firstName_3',
        lastName: 'lastName_3',
        gender: 'Female',
        weight: 50,
        dateOfBirth: new Date(),
        age: 1
    };

    mockAthletes: Athlete[] = [ this.mockAthlete1, this.mockAthlete2, this.mockAthlete3 ];

    getAthletes() : Observable<Athlete[]> {
        return Observable.of(this.mockAthletes);
    } 
    
    getAthleteById(id) : Observable<Athlete> {
        return Observable.of(this.mockAthlete1);
    }
}