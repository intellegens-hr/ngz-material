// NgzGridOrderBy pipe
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';
import { EnTTManagerService } from '../../../../../services';

/**
 * Ordering pipe implementation
 *
 * Usage:
 *
 * [...] | NgzGridOrderBy:orderingField:orderingAscDirection
 */
@Pipe({ name: 'NgzGridOrderBy' })
export class OrderByPipe implements PipeTransform {

  constructor (private _enttManager: EnTTManagerService) {}

  /**
   * Orders array members by requested property name (ascending or descending)
   * @param array Array to reorder
   * @param enabled If filter is enabled
   * @param orderingField Property key to reorder members of the array by
   * @param orderingAscDirection If ordering is ascending or descending
   * @returns Reordered copy of the array
   */
  public transform (array: any, enabled = true, orderingField: string, orderingAscDirection: boolean): any[] {

    // Check if filter is disabled
    if (!enabled) { return array; }

    // Check if no ordering field provided
    if (!orderingField) { return array; }

    // Check if ordering an array
    if (!Array.isArray(array)) { return array; }

    // Sort array and return a copy
    return [
      ...array.sort((a: any, b: any) => {
        const valueA = this._enttManager.getByPath(a, orderingField),
              valueB = this._enttManager.getByPath(b, orderingField);
        if (valueA < valueB) {
          return (orderingAscDirection ? -1 : +1);
        } else if (valueA > valueB) {
          return (orderingAscDirection ? +1 : -1);
        } else {
          return 0;
        }
      })
    ];

  }

}
