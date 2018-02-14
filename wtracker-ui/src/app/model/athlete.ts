import { Filterable } from './filterable';

export class Athlete extends Filterable {
    id: String;
    firstName: String;
    lastName: String;
    dateOfBirth: Date;
    age: Number;
    weight: Number;
    gender: String;
    
    public constructor(init? : Partial<Athlete>) {
        super();
        Object.assign(this, init);
        this.filterableProperties.push('firstName', 'lastName', 'gender', 'age', 'weight');  
    }
}