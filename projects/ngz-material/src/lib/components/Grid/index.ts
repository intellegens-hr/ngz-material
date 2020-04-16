// <ngz-grid /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, AfterContentInit , OnChanges, OnDestroy, SimpleChanges,
         Input, Output, EventEmitter, ContentChildren, QueryList, ContentChild, ViewChild } from '@angular/core';
import { SubscriptionLike, Observable } from 'rxjs';
import { NgzGridColumnDefDirective, GridColumnConfiguration  } from './directives/ngzGridColumnDef';
import { NgzGridPaginationDefDirective, GridPaginationConfiguration  } from './directives/ngzGridPaginationDef';
import { NgzGridFilteringDefDirective, GridFilteringConfiguration  } from './directives/ngzGridFilteringDef';
import { FilterByPipe } from './pipes/filterBy';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, MatSortHeader } from '@angular/material/sort';

/**
 * Grid configuration
 */
class GridConfiguration {

  // Holds a method providing a list of property keys in parent data source's data array
  private _getParentGridDataSourceKeys: () => string[];

  /**
   * Creates an instance of GridConfiguration
   * @param _getParentGridDataSourceKeys Method providing a list of property keys in parent data source's data array
   */
  constructor (getParentGridDataSourceKeys: () => string[]) {
    // Set provider method to be used to get all data source keys
    this._getParentGridDataSourceKeys = getParentGridDataSourceKeys;
  }

  // Holds explicitly defined column configurations
  private _nonDefaultColumnConfigurations: any;
  /**
   * Gets/Sets columns' configurations
   */
  public set columns (defs) {
    // Set explicitly defined columns' configuration
    this._nonDefaultColumnConfigurations = defs;
  }
  public get columns () {
    // Augment explicitly defined columns' configuration with default configuration for all remaining columns
    const defaultColumnConfiguration = new GridColumnConfiguration();
    return this._getParentGridDataSourceKeys().reduce((columns, key) => {
      if (!columns[key]) { columns[key] = defaultColumnConfiguration; }
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
export class GridComponent implements AfterContentInit, OnChanges, OnDestroy {

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
   * Event triggering when Grid state changes (update to ordering, pagination or filtering)
   */
  // tslint:disable-next-line: no-output-native
  @Output()
  public changed = new EventEmitter<any>();

  /**
   * Content child elements implementing a [ngzGridColumnDef]="propertyKey" directive
   * handling specific column's configuration
   */
  @ContentChildren(NgzGridColumnDefDirective)
  public columnDefs: QueryList<NgzGridColumnDefDirective>;
  /**
   * Content child elements implementing a [ngzGridPaginationDef] directive
   * handling pagination configuration
   */
  @ContentChild(NgzGridPaginationDefDirective)
  public paginationDef: NgzGridPaginationDefDirective;
  /**
   * Content child elements implementing a [ngzGridFilteringDef] directive
   * handling filtering configuration
   */
  @ContentChild(NgzGridFilteringDefDirective)
  public filteringDef: NgzGridFilteringDefDirective;

  /**
   * Reference to internal <mat-table /> paginator component
   */
  @ViewChild(MatPaginator)
  private _paginator: MatPaginator;

  /**
   * Reference to internal <mat-table /> sort component
   */
  @ViewChild(MatSort)
  private _sort: MatSort;

  //#endregion

  //#region Properties

  // Configuration: Holds internal configuration instance
  private _config = new GridConfiguration(() => this._dataKeys);
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
      return (new FilterByPipe()).transform(this._data, this._filters).length;
    }
  }

  // Filtering: Hash-table of filtering key-value pairs
  // where key is the property key of the property being filtered by and value is the filtering value
  public _filters = {};

  //#endregion

  //#region Component life-cycle

  public ngAfterContentInit () {

    // Initialize columns' configuration
    this._config.columns = GridColumnConfiguration.create(this.columnDefs);

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
    this._paginator.firstPage();
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
  public _onFilterUpdated (key, e: any) {
    // Apply updated state
    const value = e.target.value;
    if (value === undefined || value === null || value === '') {
      delete this._filters[key];
    } else {
      this._filters[key] = value;
    }
    // Trigger (changed) event with updated values
    this._triggerChangedEvent({ });
    // Resetting pagination because of filtering
    this._pageIndex = 0;
    this._paginator.firstPage();
  }

  /**
   * Returns header/footer template context object
   * @param key Column key to provide context for
   * @returns Template context for the column header
   */
  public _getHeaderAndFooterTemplateContext (key) {
    const lastIndex = (this._pageIndex * this._pageLength) + this._pageLength - 1;
    return {
     config: this._config.columns[key],
     key,
     caption: (this._config.columns[key].footer || key),
     values: this._data.map(row => row[key]),
     page: {
       first: this._pageIndex * this._pageLength,
       last: lastIndex <= this._totalLength ? lastIndex : this._totalLength - 1
      }
    };
  }

  /**
   * Returns cell template context object
   * @param row Data row of the cell to provide context for
   * @param key Column key to provide context for
   * @returns Template context for the column cell
   */
  public _getCellTemplateContext (row, key) {
    return {
      row,
      key,
      caption: row[key]
    };
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
    filters               = undefined as object
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
    const e = {

      // Incoming state (separate copy, to protect from manipulation)
      state: JSON.parse(JSON.stringify(state)),

      // Methods to control the grid
      controller: {

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

      }

    };

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
    filters               = undefined as object
  }) {
    // Compose and return state object
    return {
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
    };
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
    if (pageIndex !== undefined) {
      this._paginator.pageIndex = this._pageIndex;
    }
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
  }

  //#endregion

}
