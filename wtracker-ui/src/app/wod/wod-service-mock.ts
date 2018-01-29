import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Wod } from './wod';

@Injectable()
export class WodServiceMock { 
    
    mockWod1: Wod = { 
        id: '1', 
        name: 'wod_1', 
        description: 'wod no 1',
        type: '1'
    };

    mockWod2: Wod = { 
        id: '2', 
        name: 'wod_2', 
        description: 'wod no 2',
        type: '2'
    };
    
    mockWods: Wod[] = [ this.mockWod1, this.mockWod2 ];

    getWods() : Observable<Wod[]> {
        return Observable.of(this.mockWods);
    } 
}


