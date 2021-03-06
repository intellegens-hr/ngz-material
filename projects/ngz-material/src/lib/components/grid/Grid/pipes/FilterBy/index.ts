// NgzGridFilterBy pipe
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';
import { EnTTManagerService } from '../../../../../services';

/**
 * Filtering pipe implementation
 *
 * Usage:
 *
 * [...] | NgzGridFilterBy:filter
 */
@Pipe({ name: 'NgzGridFilterBy', pure: false })
export class FilterByPipe  implements PipeTransform {

  constructor (private _enttManager: EnTTManagerService) {}

  /**
   * Filters array members based on a hash-table of filtering key-value pairs where key is the property key of the property
   * being filtered by and value is the filtering value
   * @param array Array to filter members from
   * @param enabled If filter is enabled
   * @param filter Hash-table of filtering key-value pairs where key is the property key of the property being filtered by
   *        and value is the filtering value
   * @returns Array of members matching the filter
   */
   public  transform (array: any, enabled = true, filter: any): any {

    // Check if filter is disabled
    if (!enabled) { return array; }

    // Check if ordering an array
    if (!Array.isArray(array)) { return array; }

    // Check filter
    if (!filter || !(filter instanceof Object)) { return array; }

    // Filter array members
    const filterKeys = Object.keys(filter);
    return array.filter(
      member => !filterKeys.find(
        (key) => !(new RegExp(filter[key]).test(
          this._enttManager.getByPath(member, key)
        ))
      )
    );
  }

}
