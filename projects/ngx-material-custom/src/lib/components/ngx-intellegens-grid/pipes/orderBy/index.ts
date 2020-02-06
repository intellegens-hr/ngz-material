// ngxIntellegensGridOrderBy pipe
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Ordering pipe implementation
 *
 * Usage:
 *
 * [...] | ngxIntellegensGridOrderBy:orderingField:orderingAscDirection
 */
@Pipe({ name: 'ngxIntellegensGridOrderBy' })
export class OrderByPipe implements PipeTransform {

  /**
   * Orders array members by requested property name (ascending or descending)
   * @param array Array to reorder
   * @param orderingField Property key to reorder members of the array by
   * @param orderingAscDirection If ordering is ascending or descending
   * @returns Reordered copy of the array
   */
  public transform (array: any, orderingField: string, orderingAscDirection: boolean): any[] {

    // Check if ordering an array
    if (!Array.isArray(array)) { return array; }

    // Sort array and return a copy
    return [
      ...array.sort((a: any, b: any) => {
        if (a[orderingField] < b[orderingField]) {
          return (orderingAscDirection ? +1 : -1);
        } else if ( a[orderingField] > b[orderingField]) {
          return (orderingAscDirection ? -1 : +1);
        } else {
            return 0;
          }
      })
    ];

  }

}
