// ngxIntellegensGridPaginate pipe
// ----------------------------------------------------------------------------

// Import dependencies
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pagination pipe implementation
 *
 * Usage:
 *
 * [...] | ngxIntellegensGridPaginate:pageLength:pageIndex
 */
@Pipe({ name: 'ngxIntellegensGridPaginate' })
export class PaginatePipe  implements PipeTransform {

  /**
   * Slices a single "page" out of the array
   * @param array Array to paginate
   * @param pageLength Number of array members per page
   * @param pageIndex Index of the page to slice out
   * @returns Page slice of the array
   */
  public transform (array: any, pageLength: number, pageIndex: number) {

    // Check if ordering an array
    if (!Array.isArray(array)) { return array; }

    // Calculate page start index
    const firstIndex = ((pageIndex * pageLength) < array.length ? (pageIndex * pageLength) : Math.floor(array.length / pageLength));

    // Slice out a page
    return array.slice(firstIndex, firstIndex + pageLength);

  }

}
