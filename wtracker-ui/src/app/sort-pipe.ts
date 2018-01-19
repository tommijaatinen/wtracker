import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: "sortBy"})
export class SortPipe implements PipeTransform {
  transform(array: Array<string>, field: string, sortAsc): Array<string> {
      if (array) {
          if (sortAsc) {
            array.sort((a,b) => this.ascending(a, b, field));
          } else {
            array.sort((a,b) => this.descending(a, b, field));              
          }
      }
    return array;
  }
        
  private ascending(a:any, b:any, field)  {
    if ( a[field] < b[field] ){
        return -1;
    } else if( a[field] > b[field] ){
        return 1;
    } else {
        return 0;	
    }
  }
    
  private descending(a, b, field)  {
    if ( a[field] < b[field] ){
        return 1;
    } else if( a[field] > b[field] ){
        return -1;
    } else {
        return 0;	
    }
  }

}