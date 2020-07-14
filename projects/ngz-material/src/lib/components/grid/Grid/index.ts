// <ngz-grid /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, AfterContentInit, AfterViewInit, OnChanges, OnDestroy, SimpleChanges,
         Input, Output, EventEmitter, ContentChildren, QueryList, ContentChild, ViewChild, TemplateRef,
         ChangeDetectorRef } from '@angular/core';
import { SubscriptionLike, Observable } from 'rxjs';
import { EnTTManagerService } from '../../../services';
import { GridColumnDefDirective,
         GridColumnCellTemplateDirective, GridColumnHeaderCellTemplateDirective, GridColumnFooterCellTemplateDirective,
         GridColumnConfiguration, GridColumnDefaultOrdering, GridColumnFilterTemplateDirective } from './directives/GridColumnDef';
import { GridPaginationDefDirective, GridPaginationConfiguration  } from './directives/GridPaginationDef';
import { GridFilteringDefDirective, GridFilteringConfiguration  } from './directives/GridFilteringDef';
import { GridInjectedContentDefDirective, GridInjectedContentConfiguration  } from './directives/GridInjectedContentDef';
import { FilterByPipe } from './pipes/FilterBy';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, MatSortHeader } from '@angular/material/sort';
import { GridFilterBase, GridFilterSimple } from './models';

/**
 * Grid configuration
 */
class GridConfiguration {

  // Holds a method providing a list of property keys in parent data source's data array
  private _getParentGridDataSourceKeys: () => string[];
  // Holds a method providing providing parent detectColumns status
  private _getParentGridDetectColumns: () => boolean;

  /**
   * Creates an instance of GridConfiguration
   * @param getParentGridDataSourceKeys Method providing a list of property keys in parent data source's data array
   * @param getParentGridDetectColumns Method providing parent detectColumns status
   */
  constructor (getParentGridDataSourceKeys: () => string[], getParentGridDetectColumns: () => boolean) {
    // Set provider method to be used to get all data source keys
    this._getParentGridDataSourceKeys = getParentGridDataSourceKeys;
    // Set provider method to be used to get detectColumns status
    this._getParentGridDetectColumns = getParentGridDetectColumns;
  }

  // Holds explicitly defined column configurations
  private _nonDefaultColumnConfigurations: any;
  /**
   * Gets/Sets columns' configurations
   */
  public set columns (defs: {[key: string]: GridColumnConfiguration}) {
    // Set explicitly defined columns' configuration
    this._nonDefaultColumnConfigurations = defs;
  }
  public get columns () {
    // Augment explicitly defined columns' configuration with default configuration for all remaining columns
    const defaultColumnConfiguration = new GridColumnConfiguration(),
          detectedColumns = (this._getParentGridDetectColumns() ? this._getParentGridDataSourceKeys() : []);
    return detectedColumns.reduce((columns, key) => {
      if (!columns[key]) { columns[key] = defaultColumnConfiguration; }
      if (columns[key].hidden) { delete columns[key]; }
      return columns;
    }, { ...this._nonDefaultColumnConfigurations });
  }

  /**
   * Holds pagination configuration
   */
  public pagination: any = {};

  /**
   * Holds filtering configuration
   */
  public filtering: any = {};

  /**
   * Holds above injected content configuration
   */
  private _injectedAbove: GridInjectedContentConfiguration[] = [];
  /**
   * Holds top injected content configuration
   */
  private _injectedTop: GridInjectedContentConfiguration[] = [];
  /**
   * Holds bottom injected content configuration
   */
  private _injectedBottom: GridInjectedContentConfiguration[] = [];
  /**
   * Holds below injected content configuration
   */
  private _injectedBelow: GridInjectedContentConfiguration[] = [];
  // Gets/Sets injected content configurations
  public set injected (defs: GridInjectedContentConfiguration[]) {
    this._injectedAbove = defs.filter(def => def.position === 'above');
    this._injectedTop = defs.filter(def => def.position === 'top');
    this._injectedBottom = defs.filter(def => def.position === 'bottom');
    this._injectedBelow = defs.filter(def => def.position === 'below');
  }
  public get injected () {
    return [ ...this._injectedTop, ...this._injectedBottom ];
  }
  public get injectedAbove () {
    return [ ...this._injectedAbove ];
  }
  public get injectedTop () {
    return [ ...this._injectedTop ];
  }
  public get injectedBottom () {
    return [ ...this._injectedBottom ];
  }
  public get injectedBelow () {
    return [ ...this._injectedBelow ];
  }

}

export class GridChangeEventFilterItem {
  public filter: GridFilterBase;
  public filteringKeys: string[] = [];
}

export type GridChangeEventFilters = {[key: string]: GridChangeEventFilterItem}

/**
 * Holds Grid changed event state description
 */
export class GridChangeEventState {

  /**
   * Updated value of the field key to order rows by
   */
  public orderingField: string;
  /**
   * Updated value of if ordering in ascending direction
   */
  public orderingAscDirection: boolean;
  /**
   * Updated value of current page's index
   */
  public pageIndex: number;
  /**
   * Updated value of previous page's index
   */
  public previousPageIndex: number;
  /**
   * Total number of rows in updated data
   */
  public pageLength: number;
  /**
   * Total number of rows in updated data
   */
  public totalLength: number;
  /**
   * Updated value of the hash-table of filtering key-value pairs
   */
  public filters: GridChangeEventFilters;

  /**
   * Constructor
   * @param orderingField Updated value of the field key to order rows by
   * @param orderingAscDirection Updated value of if ordering in ascending direction
   * @param pageIndex Updated value of current page's index
   * @param previousPageIndex Updated value of previous page's index
   * @param totalLength Total number of rows in updated data
   * @param filters Updated value of the hash-table of filtering key-value pairs
   */
  constructor ({
    orderingField        = undefined as string,
    orderingAscDirection = undefined as boolean,
    pageIndex            = undefined as number,
    previousPageIndex    = undefined as number,
    pageLength           = undefined as number,
    totalLength          = undefined as number,
    filters              = undefined as GridChangeEventFilters
  }) {
    // Set properties
    this.orderingField        = orderingField;
    this.orderingAscDirection = orderingAscDirection;
    this.pageIndex            = pageIndex;
    this.previousPageIndex    = previousPageIndex;
    this.pageLength           = pageLength;
    this.totalLength          = totalLength;
    this.filters              = filters;
  }
}

/**
 * Holds Grid changed event descriptor
 */
export class GridChangeEvent {

  /**
   * Grid state description
   */
  public state: GridChangeEventState;
  /**
   * Provides control over the grid component
   */
  public controller: IGridChangeEventController;
  /**
   * Toggles off local pagination, ordering and filtering
   */
  public preventDefault: () => void;

  /**
   * Constructor
   * @param state Grid state description
   * @param controller Provides control over the grid component
   * @param preventDefault Toggles off local pagination, ordering and filtering
   */
  constructor (state: GridChangeEventState, controller?: IGridChangeEventController, preventDefault?: () => void) {
    this.state = state;
    this.controller = controller;
    this.preventDefault = preventDefault;
  }
}

/**
 * Grid controller interface
 */
export interface IGridChangeEventController {
  updateOrdering: ({ orderingField, orderingAscDirection }) => void;
  updatePagination: ({ pageIndex }) => void;
  updateFiltering: (key: string, value: any) => void;
}

/**
 * Grid row customization description
 */
class GridRowCustomization {

  /**
   * Creates an instance of GridRowCustomization
   * @param comparator Comparator function comparing data-source items for which the customization is to be applied
   * @param customClassName Custom class name to be applied to the row
   * @param duration Optional duration (in [ms]) for the custom styling. If present, will trigger a timeout after the set interval
   */
  constructor (comparator: (item: any) => boolean, customClassName: string|string[], duration = 0) {
    // Store properties
    this.comparator = comparator;
    this.customClassName = customClassName;
    this.duration = duration;
    // If duration set, trigger an expiration timeout
    if (this.duration) {
      setTimeout(() => { this._expired = true; }, this.duration);
    }
  }

  /**
   * Internal expiration status
   */
  private _expired = false;
  /**
   * Gets expiration status
   */
  public get expired () {
    return this._expired;
  }

  /**
   * Comparator function comparing data-source items for which the customization is to be applied
   */
  public comparator: (item: any) => boolean;

  /**
   * Custom class name to be applied to the row
   */
  public customClassName: string|string[];

  /**
   * Optional duration (in [ms]) for the custom styling. If present, will trigger a timeout after the set interval
   */
  public duration: number;

}

/**
 * Grid component, based on Angular material's <mat-table />
 * Supports:
 * - Pagination
 * - Sorting
 * - Filtering
 * - TODO: ...
 *
 * Usage:
 * <ngz-grid [dataSource]="[...]">\
 *  TODO: Add a full usage syntax example\
 * </ngz-grid>
 */
@Component({
  selector:    'ngz-grid',
  templateUrl: './index.html',
  styleUrls:   ['./style.scss']
})
export class GridComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {

  //#region HTML component interface (@Inputs/@Outputs/@Content)

  /**
   * Grid data source; expects an array of items or a Promise resolving to an array of items or an Observable resolving to an array of items
   */
  @Input()
  public dataSource: any[]|Promise<any[]>|Observable<any[]>;

  /**
   * Grid total data length; (Optional) Number of rows of data grid is supposed to be representing,
   * regardless of number of rows being displayed or present in current dataSource
   */
  @Input()
  public dataLength: number;

  /**
   * If false, table won't event attempt to do client-side ordering, pagination or filtering
   */
  @Input()
  public dataManageLocally = true;

  /**
   * If grid should auto-detect columns from provided data source
   */
  @Input()
  public detectColumns = true;

  /**
   * Allows for external setting of errors for the Grid
   */
  @Input()
  public error: Error = null;

  /**
   * Allows for external setting of loading state for the Grid
   */
  @Input()
  public loading = false;

  /**
   * If Grid should display a header
   */
  @Input()
  public header = true;

  /**
   * If Grid should display a footer
   */
  @Input()
  public footer = false;

  /**
   * Event triggering when Grid state changes (update to ordering, pagination or filtering)
   */
  // tslint:disable-next-line: no-output-native
  @Output()
  public changed = new EventEmitter<any>();

  /**
   * Content child elements implementing a [ngzGridColumnDef]="propertyKey" directive
   * handling specific column's configuration
   */
  @ContentChildren(GridColumnDefDirective)
  public columnDefs: QueryList<GridColumnDefDirective>;
  /**
   * Content child element implementing a [ngzGridPaginationDef] directive
   * handling pagination configuration
   */
  @ContentChild(GridPaginationDefDirective, { static: true })
  public paginationDef: GridPaginationDefDirective;
  /**
   * Content child element implementing a [ngzGridFilteringDef] directive
   * handling filtering configuration
   */
  @ContentChild(GridFilteringDefDirective, { static: true })
  public filteringDef: GridFilteringDefDirective;
  /**
   * Content child elements implementing a [ngzGridInjectedContentDef] directive
   * providing injected content
   */
  @ContentChildren(GridInjectedContentDefDirective)
  public injectedContentDef: QueryList<GridInjectedContentDefDirective>;

  /**
   * Reference to internal <mat-table /> paginator component
   */
  @ViewChild(MatPaginator, { static: true })
  private _paginator: MatPaginator;

  /**
   * Reference to internal <mat-table /> sort component
   */
  @ViewChild(MatSort, { static: true })
  private _sort: MatSort;

  /**
   * Reference to default table cell template
   */
  @ViewChild(MatTable, { read: MatTable, static: true })
  private _table: MatTable<any>;
  /**
   * Reference to default table cell template
   */
  @ViewChild(GridColumnCellTemplateDirective, { read: TemplateRef, static: true })
  private _defaultTableCellTemplate: TemplateRef<any>;
    /**
   * Reference to default table filter cell template
   */
  @ViewChild(GridColumnFilterTemplateDirective, { read: TemplateRef, static: true })
  private _defaultTableFilterCellTemplate: TemplateRef<any>;
  /**
   * Reference to default table cell template
   */
  @ViewChild(GridColumnHeaderCellTemplateDirective, { read: TemplateRef, static: true })
  private _defaultTableHeaderCellTemplate: TemplateRef<any>;
  /**
   * Reference to default table cell template
   */
  @ViewChild(GridColumnFooterCellTemplateDirective, { read: TemplateRef, static: true })
  private _defaultTableFooterCellTemplate: TemplateRef<any>;
  /**
   * Reference to default table cell template
   */
  @ViewChild('defaultColumnNullCellTemplate', { read: TemplateRef, static: true })
  private _defaultTableNullCellTemplate: TemplateRef<any>;

  //#endregion

  //#region Properties

  // Configuration: Holds internal configuration instance
  private _config = new GridConfiguration(
    () => this._dataKeys,
    () => this.detectColumns
  );
  /**
   * Configuration: Makes configuration available as public
   */
  public get configuration () {
    return this._config;
  }

  /**
   * Gets current state of the grid
   */
  public get state () {
    return this._composeState({});
  }

  // Data source: Data resolved from [dataSource]
  public _data: any[] = [];
  // Data source: Contains all found property keys in any of data items
  private _dataKeys: string[] = [];

  /**
   * Configuration/Data source: Contains all found property keys in any of data items appended with keys of any configured virtual columns
   */
  public get _columnKeys () {
    return Object.keys(this._config.columns);
  }

  // Data source: If data-source set as Observable, this will keep a reference to the subscription
  // to this Observable (in case unsubscribe needed later)
  private _dataSourceSubscription: SubscriptionLike;

  // Holds internal errors
  public _internalError: Error = null;
  // Holds internal loading state
  public _internalLoading = false;

  // If ordering, pagination and filtering should be handled locally
  public _doLocalDataManagement = true;
  public get _doLocalOrdering () {
    return this.dataManageLocally && this._doLocalDataManagement;
  }
  public get _doLocalPagination () {
    return this.dataManageLocally && this._doLocalDataManagement;
  }
  public get _doLocalFiltering () {
    return this.dataManageLocally && this._doLocalDataManagement;
  }

  // Ordering: Field key to order rows by
  public _orderingField: string;
  // Ordering: If ordering in ascending direction
  public _orderingAscDirection = true;

  // Pagination: Current page's index
  public _pageIndex: number;
  // Pagination: Each page's size (number of rows displayed per page)
  public _pageLength: number;
  // Pagination: Total number of rows in current data
  public get _totalLength () {
    if (this.dataLength !== undefined) {
      // Explicitly set data length
      return this.dataLength;
    } else {
      // Calculate data length based on current filtering od current data
      return (new FilterByPipe()).transform(this._data, this._doLocalDataManagement, this._filters).length;
    }
  }

  // Filtering: Hash-table of filtering key-value pairs
  // where key is the property key of the property being filtered by and value is the filtering value
  public _filters: GridChangeEventFilters = {};

  /**
   * Holds row customizations
   */
  public _customizations = [] as GridRowCustomization[];

  //#endregion

  //#region Component life-cycle

  constructor (
    public _enttManager: EnTTManagerService,
    private _cd: ChangeDetectorRef
  ) {}

  public ngAfterContentInit () {

    // Initialize columns' configuration
    this._config.columns = GridColumnConfiguration.create(this.columnDefs.toArray());

    // Pick up on column configuration changes
    for (const config of Object.values(this._config.columns)) {
      // Detect changes on config update
      (config as GridColumnConfiguration).updated.subscribe(() => {
        this._cd.detectChanges();
      });
    }

    // Inject column templates
    for (const key of this._columnKeys) {

      // Get column configuration
      const config = this.configuration.columns[key] as GridColumnConfiguration;

      // If no template, use default template
      config.cellTemplate = config.cellTemplate || this._defaultTableCellTemplate;
      config.cellFilterTemplate = config.cellFilterTemplate || this._defaultTableFilterCellTemplate;
      config.headerCellTemplate = config.headerCellTemplate || this._defaultTableHeaderCellTemplate;
      config.footerCellTemplate = config.footerCellTemplate || this._defaultTableFooterCellTemplate;

      // Inject table column template
      // const columnDef = new MatColumnDef();
      // columnDef.name = key;
      // columnDef.cell = new MatCellDef(this._defaultTableNullCellTemplate);
      // columnDef.headerCell = new MatCellDef(this._defaultTableNullCellTemplate);
      // columnDef.footerCell = new MatCellDef(this._defaultTableNullCellTemplate);
      // this._table.addColumnDef(columnDef);

    }

    // Initialize pagination configuration
    this._config.pagination = GridPaginationConfiguration.create(this.paginationDef);
    // Set initial page size
    if (this._config.pagination.hasPagination !== false) {
      this._pageLength = this._config.pagination.defaultPageLength;
    }

    // Initialize filtering configuration
    this._config.filtering = GridFilteringConfiguration.create(this.filteringDef);
    // Disable filtering if all columns have filtering explicitly disabled
    this._config.filtering.hasFilteringColumns = (!Object.values(this._config.columns).length)
                                              || !!Object.values(this._config.columns)
                                                    .find((columnConf: GridColumnConfiguration) => columnConf.hasFiltering);

    // Initialize injected content configuration
    this._config.injected = GridInjectedContentConfiguration.create(this.injectedContentDef.toArray());

  }

  public ngAfterViewInit () {
    // Pick up on column configuration changes
    for (const config of Object.values(this._config.columns)) {
      // Check for default ordering
      const options = [
        GridColumnDefaultOrdering.DEFAULT_ASCENDING.toString(),
        GridColumnDefaultOrdering.DEFAULT_DESCENDING.toString()
      ];
      if (options.indexOf((config as GridColumnConfiguration).hasOrdering.toString()) !== -1) {
        this._doUpdateOrdering({
          orderingField:        (config as GridColumnConfiguration).key,
          orderingAscDirection: ((config as GridColumnConfiguration).hasOrdering === GridColumnDefaultOrdering.DEFAULT_ASCENDING.toString())
        });
      }
    }
  }

  public ngOnChanges (changes: SimpleChanges) {
    // On [dataSource] change, resolve new data source data
    if (changes.dataSource) {

      // Clean internal error status from previous data source if they exist
      this._internalError = null;
      // Clear internal loading status
      this._internalLoading = false;
      // Unsubscribe from previous dataSource if subscription exists
      if (this._dataSourceSubscription) {
        this._dataSourceSubscription.unsubscribe();
      }

      // Ingest dataSource
      if (this.dataSource instanceof Promise) {
        // Ingest Promise of data
        this._ingestPromiseData();
      } else if (this.dataSource instanceof Observable) {
        // Ingest Observable data
        this._ingestObservableData();
      } else {
        // Ingest raw data
        this._ingestRawData();
      }

    }
  }

  public ngOnDestroy () {
    // Unsubscribe from previous dataSource if subscription exists
    if (this._dataSourceSubscription) {
      this._dataSourceSubscription.unsubscribe();
    }
  }

  //#endregion

  //#region Exposed methods for managing the component

  /**
   * Updates ordering state and triggers (changed) event
   * @param orderingField Field key to order rows by
   * @param orderingAscDirection If ordering in ascending direction
   */
  public updateOrdering ({
    orderingField         = undefined as string,
    orderingAscDirection  = undefined as boolean
  }) {
    // Update state
    this._doUpdateOrdering({ orderingField, orderingAscDirection });
    // Trigger (changed) event
    this._triggerChangedEvent({});
  }

  /**
   * Updates pagination state and triggers (changed) event
   * @param pageIndex Current page's index
   * @param totalLength Total number of rows in current data
   */
  public updatePagination ({
    pageIndex   = undefined as number
  }) {
    // Update state
    this._doUpdatePagination({ pageIndex });
    // Trigger (changed) event
    this._triggerChangedEvent({});
  }

  /**
   * Updates filtering state and triggers (changed) event
   * @param key Property key of the property being filtered by
   * @param value Filtering value (if null, filtering by this property will be dropped)
   */
  public updateFiltering (key: string, value: any) {
    // Update state
    this._doUpdateFiltering(key, value);
    // Trigger (changed) event
    this._triggerChangedEvent({});
  }

  /**
   * Sets row customization
   * @param comparator Comparator function comparing data-source items for which the customization is to be applied
   * @param customClassName Custom class name to be applied to the row
   * @param duration Optional duration (in [ms]) for the custom styling. If present, will trigger a timeout after the set interval
   * @returns Undo function
   */
  public customizeRow (comparator: (item: any) => boolean, customClassName: string|string[], duration = 0) {
    // Clear expired customizations
    this._customizations = this._customizations.filter(customization => !customization.expired);
    // Add new customization
    const newCustomization = new GridRowCustomization(comparator, customClassName, duration);
    this._customizations.push(newCustomization);
    // Return "undo" function
    return () => {
      this._customizations = this._customizations.filter(customization => (customization !== newCustomization));
      this._cd.detectChanges();
    };
  }

  //#endregion

  //#region <mat-table /> and other UI events' handlers and other UI helper methods

  /**
   * Handles <mat-table /> (UI triggered) sorting change
   * @param e Sorting event descriptor object
   */
  public _onMatTableSort (e) {
    // Apply updated state
    this._orderingField = e.active;
    this._orderingAscDirection = !(e.direction === 'asc');
    // Trigger (changed) event with updated values
    this._triggerChangedEvent({});
    // Resetting pagination because of sorting
    this._pageIndex = 0;
    if (this._paginator) { this._paginator.firstPage(); }
  }

  /**
   * Handles <mat-table /> (UI triggered) pagination change
   * @param e Pagination event descriptor object
   */
  public _onMatTablePage (e) {
    // Extract updated ordering values
    const previousPageIndex: number = e.previousPageIndex;
    // Apply updated state
    this._pageIndex = e.pageIndex;
    this._pageLength = e.pageSize;
    // Trigger (changed) event with updated values
    this._triggerChangedEvent({ previousPageIndex });
  }

  /**
   * Handles (UI triggered) filter value update
   * @param key Property key of the data property being filtered
   * @param e Event descriptor object
   */
  public _onFilterUpdated (key, filter: GridFilterBase) {
    // if value doesn't exist, remove filter item
    if (filter.isEmpty) {
      delete this._filters[key];
    } else {
      // for given key, get column configuration
      const columnConfig = this._config.columns[key];
      // check if custom filtering keys are specified for column, if not - take key as single element in array
      const filterKeys = Array.isArray(columnConfig.hasFiltering) ? columnConfig.hasFiltering : [ key ];

      // construct new filter item and set it
      const filterItem = new GridChangeEventFilterItem();
      filterItem.filter = filter;
      filterItem.filteringKeys = filterKeys;

      this._filters[key] = filterItem;
    }

    // Trigger (changed) event with updated values
    this._triggerChangedEvent({ });
    // Resetting pagination because of filtering
    this._pageIndex = 0;
    if (this._paginator) { this._paginator.firstPage(); }
  }

  /**
   * Returns header/footer template context object
   * @param key Column key to provide context for
   * @param headerOrFooter If generating for 'header' or 'footer'
   * @returns Template context for the column header
   */
  private _getHeaderAndFooterTemplateContext (key, headerOrFooter = 'header') {
    const lastIndex = (this._pageIndex * this._pageLength) + this._pageLength - 1;
    return {
     config: this._config.columns[key],
     key,
     caption: (this._config.columns[key][headerOrFooter] || key),
     values: this._data.map(row => row[key]),
     page: {
       first:   this._pageIndex * this._pageLength,
       last:    lastIndex <= this._totalLength ? lastIndex : this._totalLength - 1
      }
    };
  }
  /**
   * Returns header template context object
   * @param key Column key to provide context for
   * @returns Template context for the column header
   */
  public _getHeaderTemplateContext (key) {
    return this._getHeaderAndFooterTemplateContext(key, 'header');
  }
  /**
   * Returns footer template context object
   * @param key Column key to provide context for
   * @returns Template context for the column footer
   */
  public _getFooterTemplateContext (key) {
    return this._getHeaderAndFooterTemplateContext(key, 'footer');
  }

  /**
   * Returns cell template context object
   * @param row Data row of the cell to provide context for
   * @param key Column key to provide context for
   * @param index Row index
   * @returns Template context for the column cell
   */
  public _getCellTemplateContext (row, key, index) {
    return {
      row,
      key,
      index,
      value: row[key]
    };
  }

  /**
   * Returns cell template context object
   * @param row Data row of the cell to provide context for
   * @param key Column key to provide context for
   * @param index Row index
   * @returns Template context for the column cell
   */
  public _getFilterCellTemplateContext (key: string){
    return { 
      key,
      change: (key: string, filter: GridFilterBase) => {
        this._onFilterUpdated(key, filter);
      }
    };
  }

  public _getDefaultFilter(value: string): GridFilterSimple{
    const filter = new GridFilterSimple();
    filter.values = [ value ];
    return filter;
  }

  //#endregion

  //#region Internal methods

  /**
   * Takes raw data from [dataSource] and ingests it into the component
   */
  private _ingestRawData () {

    // Check if [dataSource] is a Promise
    if (!(this.dataSource instanceof Array)) { return; }

    // Set data as raw data source value
    this._data = this.dataSource;
    // Extract all data keys from data
    this._dataKeys = (this._data && this._data.length ? Object.keys(this._data[0]) : []);
    // Reset pagination
    this._pageIndex = 0;

  }

  /**
   * Takes Promise of data from [dataSource] and (once resolved) ingests it into the component
   */
  private _ingestPromiseData () {

    // Check if [dataSource] is a Promise
    if (!(this.dataSource instanceof Promise)) { return; }

    // Set loading status
    this._internalLoading = true;

    // Resolve Promise data-source
    this.dataSource
      .then(
        (data) => {
          // Set resolved data
          this._data = data;
          // Extract all data keys from data
          this._dataKeys = (this._data && this._data.length ? Object.keys(this._data[0]) : []);
          // Reset pagination
          this._pageIndex = 0;
        }
      )
      .catch ((err) => {
        // Handle Promise resolution error
        this._handleInternalError(err);
      })
      .finally(() => {
        // Reset loading status
        this._internalLoading = false;
      });

  }

  /**
   * Takes Observable data from [dataSource] and (once resolved) ingests it into the component
   */
  private _ingestObservableData () {

    // Check if [dataSource] is a Promise
    if (!(this.dataSource instanceof Observable)) { return; }

    // Set loading status
    this._internalLoading = true;

    // Resolve RxJs Observable data-source
    this._dataSourceSubscription = this.dataSource.subscribe(
      (data) => {
        // Set resolved data
        this._data = data;
        // Extract all data keys from data
        this._dataKeys = (this._data && this._data.length ? Object.keys(this._data[0]) : []);
        // Reset pagination
        this._pageIndex = 0;
        // Reset loading status
        this._internalLoading = false;
      },
      (err) => {
        // Handle Observable resolution error
        this._handleInternalError(err);
        // Reset loading status
        this._internalLoading = false;
      }
    );

  }

  /**
   * Handles any error caught during internal operation of the Grid component
   * @param err Error being handled
   */
  private _handleInternalError (err) {
    this._internalError = err;
  }

  /**
   * Triggers the (changed) event with state information about to be applied
   * @param orderingField Updated value of the field key to order rows by
   * @param orderingAscDirection Updated value of if ordering in ascending direction
   * @param pageIndex Updated value of current page's index
   * @param previousPageIndex Updated value of previous page's index
   * @param totalLength Total number of rows in updated data
   * @param filters Updated value of the hash-table of filtering key-value pairs
   */
  private _triggerChangedEvent ({
    orderingField         = undefined as string,
    orderingAscDirection  = undefined as boolean,
    pageIndex             = undefined as number,
    previousPageIndex     = undefined as number,
    pageLength            = undefined as number,
    totalLength           = undefined as number,
    filters               = undefined as GridChangeEventFilters
  }) {

    // Compose incoming state
    const state = this._composeState({
      orderingField,
      orderingAscDirection,
      pageIndex,
      previousPageIndex: (previousPageIndex !== undefined ? previousPageIndex : pageIndex),
      pageLength,
      totalLength,
      filters
    });

    // Ready the change event descriptor object
    const e = new GridChangeEvent(

      // Incoming state (separate copy, to protect from manipulation)
      JSON.parse(JSON.stringify(state)),

      // Methods to control the grid
      {

        /**
         * Updates ordering state
         * @param orderingField Field key to order rows by
         * @param orderingAscDirection If ordering in ascending direction
         */
        updateOrdering: ({
          // tslint:disable-next-line: no-shadowed-variable
          orderingField         = state.orderingField as string,
          // tslint:disable-next-line: no-shadowed-variable
          orderingAscDirection  = state.orderingAscDirection as boolean
        }) => {
          // Trigger ordering update (avoiding (re)triggering (changed) event), asynchronously to allow for data-changes to land first
          setTimeout(() => {
            this._doUpdateOrdering({ orderingField, orderingAscDirection });
          });
        },

        /**
         * Updates pagination state
         * @param pageIndex Current page's index
         * @param totalLength Total number of rows in current data
         */
        updatePagination: ({
          // tslint:disable-next-line: no-shadowed-variable
          pageIndex   = state.pageIndex as number
        }) => {
          // Trigger ordering update (avoiding (re)triggering (changed) event), asynchronously to allow for data-changes to land first
          setTimeout(() => {
            this._doUpdatePagination({ pageIndex });
          });
        },

        /**
         * Updates filtering state
         * @param key Property key of the property being filtered by
         * @param value Filtering value (if null, filtering by this property will be dropped)
         */
        updateFiltering:  (key, value) => {
          // Trigger ordering update (avoiding (re)triggering (changed) event), asynchronously to allow for data-changes to land first
          setTimeout(() => {
            this._doUpdateFiltering(key, value);
          });
        },

      } as IGridChangeEventController,

      // Toggles off local pagination, ordering and filtering
      () => {
        this._doLocalDataManagement = false;
      }

    );

    // Reset local ordering, pagination and filtering
    this._doLocalDataManagement = true;

    // Emit (changed) event
    this.changed.emit(e);

  }

  /**
   * Composes current state into a single object
   * @param orderingField Updated value of the field key to order rows by
   * @param orderingAscDirection Updated value of if ordering in ascending direction
   * @param pageIndex Updated value of current page's index
   * @param previousPageIndex Updated value of previous page's index
   * @param totalLength Total number of rows in updated data
   * @param filters Updated value of the hash-table of filtering key-value pairs
   * @returns Single object representing current state
   */
  private _composeState ({
    orderingField         = undefined as string,
    orderingAscDirection  = undefined as boolean,
    pageIndex             = undefined as number,
    previousPageIndex     = undefined as number,
    pageLength            = undefined as number,
    totalLength           = undefined as number,
    filters               = undefined as GridChangeEventFilters
  }) {
    // Compose and return state object
    return new GridChangeEventState({
      // Grid state (Ordering)
      orderingField:        orderingField !== undefined ? orderingField : this._orderingField,
      orderingAscDirection: orderingAscDirection !== undefined ? orderingAscDirection : this._orderingAscDirection,
      // Grid state (Pagination)
      pageIndex:            pageIndex !== undefined ? pageIndex : this._pageIndex,
      previousPageIndex,
      pageLength:           pageLength !== undefined ? pageLength : this._pageLength,
      totalLength:          totalLength !== undefined ? totalLength : this._totalLength,
      // Grid state (Filtration)
      filters:              filters !== undefined ? {...filters} : {...this._filters}
    });
  }

  /**
   * Updates ordering state
   * @param orderingField Field key to order rows by
   * @param orderingAscDirection If ordering in ascending direction
   */
  private _doUpdateOrdering ({
    orderingField         = undefined as string,
    orderingAscDirection  = undefined as boolean
  }) {
    // Update ordering state
    this._orderingField =  orderingField !== undefined ? orderingField : this._orderingField;
    this._orderingAscDirection = orderingAscDirection !== undefined ? orderingAscDirection : this._orderingAscDirection;

    // Reflect ordering changes in <mat-table /> internal state
    // Ugly hack (fixing Material table issue: https://github.com/angular/components/issues/10242#issuecomment-470726829)
    const id = this._orderingField,
          start = (this._orderingAscDirection ? 'desc' : 'asc');
    if ((this._sort.active !== id) || ((this._sort as any)._direction !== start)) {
      this._sort.sort({ id, start } as MatSortable);
      const viewState = (this._sort.sortables.get(this._orderingField) as MatSortHeader)._getArrowViewState();
      if (viewState !== 'active') {
        (this._sort.sortables.get(this._orderingField) as MatSortHeader)._setAnimationTransitionState({ toState: 'active' });
      }
    }

    // Detect changes
    this._cd.detectChanges();
  }

  /**
   * Updates pagination state
   * @param pageIndex Current page's index
   * @param totalLength Total number of rows in current data
   */
  private _doUpdatePagination ({
    pageIndex   = undefined as number
  }) {
    // Update pagination state
    this._pageIndex = pageIndex !== undefined ? pageIndex : this._pageIndex;

    // Reflect pagination changes in <mat-table /> internal state
    if (pageIndex !== undefined && this._paginator) {
      this._paginator.pageIndex = this._pageIndex;
    }

    // Detect changes
    this._cd.detectChanges();
  }

  /**
   * Updates filtering state
   * @param key Property key of the property being filtered by
   * @param value Filtering value (if null, filtering by this property will be dropped)
   */
  private _doUpdateFiltering (key: string, value: any) {
    // Update filter state
    if (value === undefined || value === null || value === '') {
      delete this._filters[key];
    } else {
      this._filters[key] = value;
    }

    // Detect changes
    this._cd.detectChanges();
  }

  /**
   * Finds a defined row customization if one exists
   * @param item Item to find a customization for
   */
  public _getRowCustomization (item: any) {
    return this._customizations.find(customization => customization.comparator(item));
  }

  //#endregion

}
