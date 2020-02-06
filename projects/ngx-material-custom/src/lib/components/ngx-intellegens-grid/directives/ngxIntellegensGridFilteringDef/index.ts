// [ngxIntellegensGridPaginationDef] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input } from '@angular/core';

/**
 * When child of <ngx-intellegens-grid /> provides filtering configuration
 *
 * Usage:
 *
 * <ng-container ngxIntellegensGridFilteringDef
 *               [hasFiltering]="true"></ng-container>
 *
 */
@Directive({
  selector: '[ngxIntellegensGridFilteringDef]'
})
export class NgxIntellegensGridFilteringDefDirective {
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

    // Pull configuration from instance of [ngxIntellegensGridFilteringDef] directive
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
