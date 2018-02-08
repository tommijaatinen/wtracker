import { AbstractFilterable } from './abstract-filterable'

export class FilteringComponent  {

    isMatch(object: AbstractFilterable, searchTerm) : Boolean {
        for (var propertyKey in object) {
            if (object.filterableProperties.includes(propertyKey)) {
                if (object[propertyKey].toString().toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0) {
                    return true;
                } 
            }
        }
        return false;
    }
}
