// [ngxIntellegensGridColumnDef] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input, ContentChild, TemplateRef } from '@angular/core';


/**
 * When child of [ngxIntellegensGridColumnDef] provides template for column's row cell
 *
 * Usage:
 *
 * <ng-container *ngxIntellegensGridColumnHeaderCellTemplate="let config = config; let key = key; let value = value">
 *  {{ value.toUpperCase() }}
 * </ng-container>
 */
@Directive({
  selector: '[ngxIntellegensGridColumnCellTemplate]'
})
export class NgxIntellegensGridColumnCellTemplateDirective {}

/**
 * When child of [ngxIntellegensGridColumnDef] provides template for column's header cell
 *
 * Usage:
 *
 * <ng-container *ngxIntellegensGridColumnHeaderCellTemplate="let config = config; let key = key; let value = value">
 *  {{ value.toUpperCase() }}
 * </ng-container>
 */
@Directive({
  selector: '[ngxIntellegensGridColumnHeaderCellTemplate]'
})
export class NgxIntellegensGridColumnHeaderCellTemplateDirective { }

/**
 * When child of [ngxIntellegensGridColumnDef] provides template for column's footer cell
 *
 * Usage:
 *
 * <ng-container *ngxIntellegensGridColumnFooterCellTemplate="let row = row; let key = key; let value = value">
 *  ${{ value }}
 * </ng-container>
 */
@Directive({
  selector: '[ngxIntellegensGridColumnFooterCellTemplate]'
})
export class NgxIntellegensGridColumnFooterCellTemplateDirective { }

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
  /**
   * If column is virtual
   */
  @Input()
  public virtual: boolean;

  /**
   * Content child elements implementing a *ngxIntellegensGridColumnCellTemplate directive
   * providing row cell template for the column
   */
  @ContentChild(NgxIntellegensGridColumnCellTemplateDirective, { read: TemplateRef, static: false})
  public cellTemplate: TemplateRef<any>;

  /**
   * Content child elements implementing a *ngxIntellegensGridColumnHeaderCellTemplate directive
   * providing header cell template for the column
   */
  @ContentChild(NgxIntellegensGridColumnHeaderCellTemplateDirective, { read: TemplateRef, static: false})
  public headerCellTemplate: TemplateRef<any>;

  /**
   * Content child elements implementing a *ngxIntellegensGridColumnFooterCellTemplate directive
   * providing footer cell template for the column
   */
  @ContentChild(NgxIntellegensGridColumnFooterCellTemplateDirective, { read: TemplateRef, static: false})
  public footerCellTemplate: TemplateRef<any>;

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
        if (!element.key) {
          config.key = 'test';
          config.virtual = true;
        } else {
          config.key = element.key;
          config.virtual = element.virtual;
        }
        // Pull configuration from instance of [NgxIntellegensGridColumnDefDirective] directive
        if (element.header !== undefined) { config.header = element.header; }
        if (element.footer !== undefined) { config.footer = element.footer; }
        if (element.hasOrdering !== undefined) { config.hasOrdering = element.hasOrdering; }
        if (element.hasFiltering !== undefined) { config.hasFiltering = element.hasFiltering; }

        // Pull templates from instance of [NgxIntellegensGridColumnDefDirective] directive
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
