import { AbstractFilterable } from '../abstract-filterable';

export class Wod extends AbstractFilterable {
    id: String;
    name: String;
    description: String;
    type: String;

    constructor() {
        super();
        this.filterableProperties.push('name', 'description', 'type');  
    }

}
