// [ngzGridColumnDef] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input, ContentChild, TemplateRef } from '@angular/core';


/**
 * When child of [ngzGridColumnDef] provides template for column's row cell
 *
 * Usage:
 *
 * <ng-container *ngzGridColumnHeaderCellTemplate="let config = config; let key = key; let value = value">
 *  {{ value.toUpperCase() }}
 * </ng-container>
 */
@Directive({
  selector: '[ngzGridColumnCellTemplate]'
})
export class NgzGridColumnCellTemplateDirective {}

/**
 * When child of [ngzGridColumnDef] provides template for column's header cell
 *
 * Usage:
 *
 * <ng-container *ngzGridColumnHeaderCellTemplate="let config = config; let key = key; let value = value">
 *  {{ value.toUpperCase() }}
 * </ng-container>
 */
@Directive({
  selector: '[ngzGridColumnHeaderCellTemplate]'
})
export class NgzGridColumnHeaderCellTemplateDirective { }

/**
 * When child of [ngzGridColumnDef] provides template for column's footer cell
 *
 * Usage:
 *
 * <ng-container *ngzGridColumnFooterCellTemplate="let row = row; let key = key; let value = value">
 *  ${{ value }}
 * </ng-container>
 */
@Directive({
  selector: '[ngzGridColumnFooterCellTemplate]'
})
export class NgzGridColumnFooterCellTemplateDirective { }

/**
 * When child of <ngz-grid /> provides configuration for how a column is displayed and how it behaves
 *
 * Usage:
 *
 * <ng-container [ngzGridColumnDef]="'columnKey'"
 *               [header]="'Header Caption" [footer]="Footer caption"
 *               [hasOrdering]="true"
 *               [hasFiltering]="true"></ng-container>
 *
 */
@Directive({
  selector: '[ngzGridColumnDef]'
})
export class NgzGridColumnDefDirective {
  /**
   * Property key for the column being configured
   */
  @Input('ngzGridColumnDef')
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
  /**
   * If column is virtual (not corresponding to a data source key)
   */
  @Input()
  public virtual: boolean;

  /**
   * Content child elements implementing a *ngzGridColumnCellTemplate directive
   * providing row cell template for the column
   */
  @ContentChild(NgzGridColumnCellTemplateDirective, { read: TemplateRef })
  public cellTemplate: TemplateRef<any>;

  /**
   * Content child elements implementing a *ngzGridColumnHeaderCellTemplate directive
   * providing header cell template for the column
   */
  @ContentChild(NgzGridColumnHeaderCellTemplateDirective, { read: TemplateRef })
  public headerCellTemplate: TemplateRef<any>;

  /**
   * Content child elements implementing a *ngzGridColumnFooterCellTemplate directive
   * providing footer cell template for the column
   */
  @ContentChild(NgzGridColumnFooterCellTemplateDirective, { read: TemplateRef })
  public footerCellTemplate: TemplateRef<any>;

}

/**
 * Grid column configuration
 */
export class GridColumnConfiguration {

  /**
   * Creates a hash-table of Grid column configuration instances
   * @param defs (Optional) Instances of [NgzGridColumnDefDirective] directive to pull configuration from
   * @returns Hash-table of Grid column configuration instances
   */
  public static create (defs) {

    // Ready a hash-table of column configurations
    const configHash = {};
    // Number increments and adds to "VirtualKey" to create virtual key for multiple virtual rows
    let virtualKeyId = 1;

    // Pull configuration from instances of [NgzGridColumnDefDirective] directive
    if (defs && defs.length) {
      defs.forEach(element => {

        // Instantiate default column configuration
        const config = new GridColumnConfiguration();
        if (!element.key) {
          config.key = 'VirtualKey' + virtualKeyId; // TODO: Make synthetic keys numbers-only: 0, 1, 2, ...
          virtualKeyId++;
          config.virtual = true;
        } else {
          config.key = element.key;
          config.virtual = element.virtual;
        }

        // Pull configuration from instance of [NgzGridColumnDefDirective] directive
        if (element.header !== undefined) { config.header = element.header; }
        if (element.footer !== undefined) { config.footer = element.footer; }
        if (element.hasOrdering !== undefined) { config.hasOrdering = element.hasOrdering; }
        if (element.hasFiltering !== undefined) { config.hasFiltering = element.hasFiltering; }

        // Pull templates from instance of [NgzGridColumnDefDirective] directive
        if (element.cellTemplate !== undefined) { config.cellTemplate = element.cellTemplate; }
        if (element.headerCellTemplate !== undefined) { config.headerCellTemplate = element.headerCellTemplate; }
        if (element.footerCellTemplate !== undefined) { config.footerCellTemplate = element.footerCellTemplate; }

        // Set column configuration
        configHash[config.key] = config;

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
  /**
   * If column is virtual (not corresponding to a data source key)
   */
  public virtual: boolean;

  /**
   * Row cell template for the column
   */
  public cellTemplate: TemplateRef<any> = null;
  /**
   * Header cell template for the column
   */
  public headerCellTemplate: TemplateRef<any> = null;
  /**
   * Footer cell template for the column
   */
  public footerCellTemplate: TemplateRef<any> = null;

}
