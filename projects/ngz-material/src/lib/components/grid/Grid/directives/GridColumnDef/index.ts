// [ngzGridColumnDef] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Injectable, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';


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
export class GridColumnCellTemplateDirective {}

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
export class GridColumnHeaderCellTemplateDirective { }

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
export class GridColumnFooterCellTemplateDirective { }


/**
 * Provides nested components and directives the option of configuring the cell configuration
 */
@Injectable()
export class GridColumnDefCustomizationProvider {

  /**
   * Holds reference to column configuration instance
   */
  private _configuration: GridColumnConfiguration;

  /**
   * Gets/Sets reference to column configuration instance
   */
  public get configuration () {
    return this._configuration;
  }
  public set configuration (_configuration: GridColumnConfiguration) {
    if (!this._configuration) {
      this._configuration = _configuration;
    }
  }

}

/**
 * When child of <ngz-grid /> provides configuration for how a column is displayed and how it behaves
 *
 * Usage:
 *
 * <ng-container [ngzGridColumnDef]="'columnKey'"
 *               [header]="'Header Caption" [footer]="Footer caption"
 *               [hasOrdering]="true"
 *               [hasFiltering]="true">
 * </ng-container>
 *
 */
@Directive({
  selector: '[ngzGridColumnDef]',
  providers: [
    { provide: GridColumnDefCustomizationProvider }
  ]
})
export class GridColumnDefDirective {
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
   * If column is hidden (not rendered as part of the grid)
   */
  @Input()
  public hidden: boolean;
  /**
   * If column is virtual (not corresponding to a data source key)
   */
  @Input()
  public virtual: boolean;

  /**
   * Content child elements implementing a *ngzGridColumnCellTemplate directive
   * providing row cell template for the column
   */
  @ContentChild(GridColumnCellTemplateDirective, { read: TemplateRef })
  public cellTemplate: TemplateRef<any>;

  /**
   * Content child elements implementing a *ngzGridColumnHeaderCellTemplate directive
   * providing header cell template for the column
   */
  @ContentChild(GridColumnHeaderCellTemplateDirective, { read: TemplateRef })
  public headerCellTemplate: TemplateRef<any>;

  /**
   * Content child elements implementing a *ngzGridColumnFooterCellTemplate directive
   * providing footer cell template for the column
   */
  @ContentChild(GridColumnFooterCellTemplateDirective, { read: TemplateRef })
  public footerCellTemplate: TemplateRef<any>;

  /**
   * Creates an instance of GridColumnDefDirective.
   * @param _customize Provided instance of GridColumnDefCustomizationProvider
   */
  constructor (private _customize: GridColumnDefCustomizationProvider) {}

  /**
   * Sets configuration instance being managed by the GridColumnDefCustomizationProvider provided instance
   */
  public set configuration (configuration: GridColumnConfiguration) {
    this._customize.configuration = configuration;
  }

}

/**
 * Grid column configuration
 */
export class GridColumnConfiguration {

  /**
   * Creates a hash-table of Grid column configuration instances
   * @param defs (Optional) Instances of [GridColumnDefDirective] directive to pull configuration from
   * @returns Hash-table of Grid column configuration instances
   */
  public static create (defs: GridColumnDefDirective[]) {

    // Ready a hash-table of column configurations
    const configHash = {};
    // Number increments and adds to "vkey" to create virtual key for multiple virtual rows
    let virtualKeyId = 1;

    // Pull configuration from instances of [GridColumnDefDirective] directive
    if (defs && defs.length) {
      defs.forEach((def: GridColumnDefDirective) => {

        // Instantiate default column configuration
        const config = new GridColumnConfiguration();
        if (!def.key) {

          // If no key, force column virtual status
          config._key = 'vkey' + virtualKeyId;
          virtualKeyId++;
          config._virtual = true;

        } else {

          // If key, copy virtual column status
          config._key = def.key;
          config._virtual = def.virtual;

        }

        // Pull configuration from instance of [GridColumnDefDirective] directive
        if (def.header !== undefined) { config._header = def.header; }
        if (def.footer !== undefined) { config._footer = def.footer; }
        if (def.hasOrdering !== undefined) { config._hasOrdering = def.hasOrdering; }
        if (def.hasFiltering !== undefined) { config._hasFiltering = def.hasFiltering; }
        if (def.hidden !== undefined) { config._hidden = def.hidden; }

        // Pull templates from instance of [GridColumnDefDirective] directive
        if (def.cellTemplate !== undefined) { config.cellTemplate = def.cellTemplate; }
        if (def.headerCellTemplate !== undefined) { config.headerCellTemplate = def.headerCellTemplate; }
        if (def.footerCellTemplate !== undefined) { config.footerCellTemplate = def.footerCellTemplate; }

        // Set column configuration
        configHash[config._key] = config;

        // Set configuration instance being managed by the GridColumnDefCustomizationProvider provided instance
        def.configuration = config;

      });
    }

    // Return composed hash-table of column configurations
    return configHash;
  }

  /**
   * Property key for the column being configured
   */
  protected _key: string;
  /**
   * Gets/Sets key property, while emitting the "updated" event when value changed
   */
  public get key () {
    return this._key;
  }
  public set key (value: string) {
    if (this._key !== value) {
      this._key = value;
      this.updated.emit(this);
    }
  }

  /**
   * CSS class for the column being configured
   */
  protected _class = 'xxx';
  /**
   * Gets/Sets CSS class, while emitting the "updated" event when value changed
   */
  public get class () {
    return this._class;
  }
  public set class (value: string) {
    if (this._class !== value) {
      this._class = value;
      this.updated.emit(this);
    }
  }

  /**
   * Caption to display in column header
   */
  protected _header: string;
  /**
   * Gets/Sets header property, while emitting the "updated" event when value changed
   */
  public get header () {
    return this._header;
  }
  public set header (value: string) {
    if (this._header !== value) {
      this._header = value;
      this.updated.emit(this);
    }
  }

  /**
   * Caption to display in column footer
   */
  protected _footer: string;
  /**
   * Gets/Sets footer property, while emitting the "updated" event when value changed
   */
  public get footer () {
    return this._footer;
  }
  public set footer (value: string) {
    if (this._footer !== value) {
      this._footer = value;
      this.updated.emit(this);
    }
  }

  /**
   * If column should provide reordering by it's value
   */
  protected _hasOrdering = true;
  /**
   * Gets/Sets hasOrdering property, while emitting the "updated" event when value changed
   */
  public get hasOrdering () {
    return this._hasOrdering;
  }
  public set hasOrdering (value: boolean) {
    if (this._hasOrdering !== value) {
      this._hasOrdering = value;
      this.updated.emit(this);
    }
  }

  /**
   * If column should provide filtering by it's value
   */
  protected _hasFiltering = true;
  /**
   * Gets/Sets hasFiltering property, while emitting the "updated" event when value changed
   */
  public get hasFiltering () {
    return this._hasFiltering;
  }
  public set hasFiltering (value: boolean) {
    if (this._hasFiltering !== value) {
      this._hasFiltering = value;
      this.updated.emit(this);
    }
  }

  /**
   * If column is hidden (not rendered as part of the grid)
   */
  protected _hidden: boolean;
  /**
   * Gets/Sets hidden property, while emitting the "updated" event when value changed
   */
  public get hidden () {
    return this._hidden;
  }
  public set hidden (value: boolean) {
    if (this._hidden !== value) {
      this._hidden = value;
      this.updated.emit(this);
    }
  }

  /**
   * If column is virtual (not corresponding to a data source key)
   */
  protected _virtual: boolean;
  /**
   * Gets/Sets virtual property, while emitting the "updated" event when value changed
   */
  public get virtual () {
    return this._virtual;
  }
  public set virtual (value: boolean) {
    if (this._virtual !== value) {
      this._virtual = value;
      this.updated.emit(this);
    }
  }

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

  /**
   * Configuration updated event
   */
  @Output()
  public updated = new EventEmitter<GridColumnConfiguration>();

}
