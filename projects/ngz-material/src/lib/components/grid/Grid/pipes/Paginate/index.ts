// NgzGridPaginate pipe
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pagination pipe implementation
 *
 * Usage:
 *
 * [...] | NgzGridPaginate:pageLength:pageIndex
 */
@Pipe({ name: 'NgzGridPaginate' })
export class PaginatePipe  implements PipeTransform {

  /**
   * Slices a single "page" out of the array
   * @param array Array to paginate
   * @param enabled If filter is enabled
   * @param pageLength Number of array members per page
   * @param pageIndex Index of the page to slice out
   * @returns Page slice of the array
   */
  public transform (array: any, enabled = true, pageLength: number, pageIndex: number) {

    // Check if filter is disabled
    if (!enabled) { return array; }

    // Check if ordering an array
    if (!Array.isArray(array)) { return array; }

    // Check if page length defined
    if (pageLength === undefined) { return array; }

    // Calculate page start index
    // tslint:disable-next-line: max-line-length
    const firstIndex = ((pageIndex * pageLength) < array.length ? (pageIndex * pageLength) : (Math.ceil(array.length / pageLength) - 1));

    // Slice out a page
    return array.slice(firstIndex, firstIndex + pageLength);

  }

}
