import { Filterable } from './abstract-filterable'

export class FilteringComponent  {

    isMatch(object: Filterable, searchTerm) : Boolean {
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
