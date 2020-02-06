// [ngxIntellegensGridColumnDef] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input } from '@angular/core';

/**
 * When child of <ngx-intellegens-grid /> provides configuration for how a column is displayed and how it behaves
 *
 * Usage:
 *
 * <ng-container [ngxIntellegensGridColumnDef]="'columnKey'"
 *               [header]="'Header Caption" [footer]="Footer caption"
 *               [hasOrdering]="true"
 *               [hasFiltering]="true"></ng-container>
 *
 */
@Directive({
  selector: '[ngxIntellegensGridColumnDef]'
})
export class NgxIntellegensGridColumnDefDirective {
  /**
   * Property key for the column being configured
   */
  @Input('ngxIntellegensGridColumnDef')
  public key: string;
  /**
   * Caption to display in column header
   */
  @Input()
  public header: string;
  /**
   * Caption to display in column footer
   */
  @Input()
  public footer: string;
  /**
   * If column should provide reordering by it's value
   */
  @Input()
  public hasOrdering: boolean;
  /**
   * If column should provide filtering by it's value
   */
  @Input()
  public hasFiltering: boolean;
}

/**
 * Grid column configuration
 */
export class GridColumnConfiguration {

  /**
   * Creates a hash-table of Grid column configuration instances
   * @param defs (Optional) Instances of [NgxIntellegensGridColumnDefDirective] directive to pull configuration from
   * @returns Hash-table of Grid column configuration instances
   */
  public static create (defs) {

    // Ready a hash-table of column configurations
    const configHash = {};

    // Pull configuration from instances of [NgxIntellegensGridColumnDefDirective] directive
    if (defs && defs.length) {
      defs.forEach(element => {

        // Instantiate default column configuration
        const config = new GridColumnConfiguration();
        config.key = element.key;

        // Pull configuration from instance of [NgxIntellegensGridColumnDefDirective] directive
        if (element.header !== undefined) { config.header = element.header; }
        if (element.footer !== undefined) { config.footer = element.footer; }
        if (element.hasOrdering !== undefined) { config.hasOrdering = element.hasOrdering; }
        if (element.hasFiltering !== undefined) { config.hasFiltering = element.hasFiltering; }

        // Set column configuration
        configHash[element.key] = config;

      });
    }

    // Return composed hash-table of column configurations
    return configHash;
  }

  /**
   * Property key for the column being configured
   */
  public key: string;
  /**
   * Caption to display in column header
   */
  public header: string;
  /**
   * Caption to display in column footer
   */
  public footer: string;
  /**
   * If column should provide reordering by it's value
   */
  public hasOrdering = true;
  /**
   * If column should provide filtering by it's value
   */
  public hasFiltering = true;

}
