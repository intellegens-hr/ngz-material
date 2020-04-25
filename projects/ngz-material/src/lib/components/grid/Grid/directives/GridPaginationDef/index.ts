// [ngzGridPaginationDef] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input } from '@angular/core';

/**
 * When child of <ngz-grid /> provides pagination configuration
 *
 * Usage:
 *
 * <ng-container ngzGridPaginationDef
 *               [hasPagination]="true"
 *               [defaultPageLength]="10"
 *               [pageLengthOptions]="[10, 20, 50, 100]"></ng-container>
 *
 */
@Directive({
  selector: '[ngzGridPaginationDef]'
})
export class GridPaginationDefDirective {
  /**
   * If pagination is enabled
   */
  @Input()
  public hasPagination: boolean;
  /**
   * Initial page size (number of rows displayed per page)
   */
  @Input()
  public defaultPageLength: number;
  /**
   * Selectable page's sizes (number of rows displayed per page)
   */
  @Input()
  public pageLengthOptions: number[];
}

/**
 * Grid pagination configuration
 */
export class GridPaginationConfiguration {

  /**
   * Creates a pagination configurations instance
   * @param def (Optional) Instance of [ngzGridPaginationDef] directive to pull configuration from
   * @returns Pagination configurations instance
   */
  public static create (def: GridPaginationDefDirective) {

    // Ready a pagination  configurations
    const config = new GridPaginationConfiguration();

    // Pull configuration from instance of [ngzGridPaginationDef] directive
    if (def) {
      if (def.hasPagination !== undefined) { config.hasPagination = def.hasPagination; }
      if (def.defaultPageLength !== undefined) { config.defaultPageLength = def.defaultPageLength; }
      if (def.pageLengthOptions !== undefined) { config.pageLengthOptions = def.pageLengthOptions; }
    }

    // Set column configuration
    return config;

  }

  /**
   * If pagination is enabled
   */
  public hasPagination = true;
  /**
   * Initial page size (number of rows displayed per page)
   */
  public defaultPageLength = 10;
  /**
   * Selectable page's sizes (number of rows displayed per page)
   */
  public pageLengthOptions = [10, 20, 50, 100];

}
