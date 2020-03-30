// [ngzGridPaginationDef] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input } from '@angular/core';

/**
 * When child of <ngz-grid /> provides filtering configuration
 *
 * Usage:
 *
 * <ng-container ngzGridFilteringDef
 *               [hasFiltering]="true"></ng-container>
 *
 */
@Directive({
  selector: '[ngzGridFilteringDef]'
})
export class NgzGridFilteringDefDirective {
  /**
   * If filtering is enabled
   */
  @Input()
  public hasFiltering: boolean;
}

/**
 * Grid filtering configuration
 */
export class GridFilteringConfiguration {
   public static create (def) {

    // Ready a pagination  configurations
    const config = new GridFilteringConfiguration();

    // Pull configuration from instance of [ngzGridFilteringDef] directive
    if (def) {
      if (def.hasFiltering !== undefined) { config.hasFiltering = def.hasFiltering; }
    }

    // Set column configuration
    return config;

  }

  /**
   * If filtering is enabled
   */
  public hasFiltering = true;
  /**
   * If any columns have filtering enabled (needs to be explicitly set)
   */
  public hasFilteringColumns = true;

}
