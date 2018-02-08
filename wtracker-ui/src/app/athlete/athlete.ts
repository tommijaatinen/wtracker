import { AbstractFilterable } from '../abstract-filterable';

export class Athlete extends AbstractFilterable {
    id: String;
    firstName: String;
    lastName: String;
    dateOfBirth: Date;
    age: Number;
    weight: Number;
    gender: String;
    
    constructor() {
        super();
        this.filterableProperties.push('firstName', 'lastName', 'gender', 'age', 'weight');  
    }
}