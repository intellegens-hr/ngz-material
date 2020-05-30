// Filtering pipe
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Orders data based on provided arguments
 */
@Pipe({
  name: 'ngzFilter'
})
export class FilterPipe implements PipeTransform {
  public transform (items: any[], filter: ((item: any) => boolean)): any {
    if (!items || !(items instanceof Array)) { return items; }
    return items.filter(item => filter(item));
  }
}
