import { Filterable } from './filterable';

export class Wod extends Filterable {
    id: String;
    name: String;
    description: String;
    type: String;

    public constructor(init? : Partial<Wod>) {
        super();
        Object.assign(this, init);
        this.filterableProperties.push('name', 'description', 'type');
    }
}
