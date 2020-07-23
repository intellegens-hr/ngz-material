// NgzGridFilterBy pipe
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';
import { GridChangeEventFilters } from '../..';

/**
 * Filtering pipe implementation
 *
 * Usage:
 *
 * [...] | NgzGridFilterBy:filter
 */
@Pipe({ name: 'NgzGridFilterBy', pure: false })
export class FilterByPipe  implements PipeTransform {

  constructor () {}

  /**
   * Filters array members based on a hash-table of filtering key-value pairs where key is the property key of the property
   * being filtered by and value is the filtering value
   * @param array Array to filter members from
   * @param enabled If filter is enabled
   * @param filter Hash-table of filtering key-value pairs where key is the property key of the property being filtered by
   *        and value is the filtering value
   * @returns Array of members matching the filter
   */
   public  transform (array: any, enabled = true, filter: GridChangeEventFilters): any {

    // Check if filter is disabled
    if (!enabled) { return array; }

    // Check if ordering an array
    if (!Array.isArray(array)) { return array; }

    // Check filter
    if (!filter || !(filter instanceof Object)) { return array; }

    // Filter array members
    const filterKeys: string[] = Object.keys(filter);

    // if no filters are set, entire array should be returned
    if (filterKeys.length === 0){
      return array;
    }
    else{
      // Test each array element
      return array.filter(member => {
        // find first element that matches specified filter. If that element doesn't exists - array
        // element will be filtered out
        const matches = filterKeys.map(key => {
          const filterItem = filter[key];
          // filter key by default is column name unless filteringKeys are specified
          const propsToMatch = filterItem.filteringKeys?.length > 0 ? filterItem.filteringKeys : [key];
          return filterItem.filter.objectMatchedByKeys(propsToMatch, member);
        });

        return matches.filter(x => x === false).length === 0;
      });
    }
  }

}
