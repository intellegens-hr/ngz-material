// AsDate pipe, casts array of partial date values into a Date object instance
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Casts array of partial date values into a Date object instance
 */
@Pipe({
  name: 'ngzAsDate'
})
export class AsDatePipe implements PipeTransform {
  public transform (items: any[]): any {
    const date = new Date();
    if (items.length > 0 && (items[0] !== undefined)) { date.setFullYear(items[0]); }
    if (items.length > 1 && (items[1] !== undefined)) { date.setMonth(items[1]); }
    if (items.length > 2 && (items[2] !== undefined)) { date.setDate(items[2]); }
    if (items.length > 3 && (items[3] !== undefined)) { date.setHours(items[3]); }
    if (items.length > 4 && (items[4] !== undefined)) { date.setMinutes(items[4]); }
    if (items.length > 5 && (items[5] !== undefined)) { date.setSeconds(items[5]); }
    return date;
  }
}
