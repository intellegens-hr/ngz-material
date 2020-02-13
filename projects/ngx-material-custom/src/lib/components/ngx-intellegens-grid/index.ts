// <ngx-intellegens-grid /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, AfterContentInit , OnChanges, OnDestroy, SimpleChanges,
         Input, Output, EventEmitter, ContentChildren, QueryList, ContentChild, ViewChild } from '@angular/core';
import { SubscriptionLike, Observable } from 'rxjs';
import { NgxIntellegensGridColumnDefDirective, GridColumnConfiguration  } from './directives/ngxIntellegensGridColumnDef';
import { NgxIntellegensGridPaginationDefDirective, GridPaginationConfiguration  } from './directives/ngxIntellegensGridPaginationDef';
import { NgxIntellegensGridFilteringDefDirective, GridFilteringConfiguration  } from './directives/ngxIntellegensGridFilteringDef';
import { FilterByPipe } from './pipes/filterBy';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, MatSortHeader } from '@angular/material/sort';

/**
 * Grid configuration
 */
class GridConfiguration {

  // Holds a method providing a list of property keys in parent data source's data array
  private getParentGridDataSourceKeys: () => string[];

  /**
   * Creates an instance of GridConfiguration
   * @param getParentGridDataSourceKeys Method providing a list of property keys in parent data source's data array
   */
  constructor (getParentGridDataSourceKeys: () => string[]) {
    // Set provider method to be used to get all data source keys
    this.getParentGridDataSourceKeys = getParentGridDataSourceKeys;
  }

  // Holds explicitly defined column configurations
  private nonDefaultColumnConfigurations: any;
  /**
   * Gets/Sets columns' configurations
   */
  public set columns (defs) {
    // Set explicitly defined columns' configuration
    this.nonDefaultColumnConfigurations = defs;
  }
  public get columns () {
    // Augment explicitly defined columns' configuration with default configuration for all remaining columns
    const defaultColumnConfiguration = new GridColumnConfiguration();
    return this.getParentGridDataSourceKeys().reduce((columns, key) => {
      if (!columns[key]) { columns[key] = defaultColumnConfiguration; }
      return columns;
    }, { ...this.nonDefaultColumnConfigurations });
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
 * <ngx-intellegens-grid [dataSource]="[...]">\
 *  TODO: Add a full usage syntax example\
 * </ngx-intellegens-grid>
 */
@Component({
  selector:     'ngx-intellegens-grid',
  templateUrl:  './index.html',
  styleUrls:    ['./style.scss']
})
export class NgxIntellegensGridComponent implements AfterContentInit, OnChanges, OnDestroy {

  //#region HTML component interface (@Inputs/@Outputs/@Content)

  /**
   * Grid data source; expects an array of items or a Promise resolving to an array of items or an Observable resolving to an array of items
   */
  @Input()
  public dataSource: any[]|Promise<any[]>|Observable<any[]>;

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
   * Content child elements implementing a [ngxIntellegensGridColumnDef]="propertyKey" directive
   * handling specific column's configuration
   */
  @ContentChildren(NgxIntellegensGridColumnDefDirective)
  public columnDefs: QueryList<NgxIntellegensGridColumnDefDirective>;
  /**
   * Content child elements implementing a [ngxIntellegensGridPaginationDef] directive
   * handling pagination configuration
   */
  @ContentChild(NgxIntellegensGridPaginationDefDirective, {static: false} )
  public paginationDef: NgxIntellegensGridPaginationDefDirective;
  /**
   * Content child elements implementing a [ngxIntellegensGridFilteringDef] directive
   * handling filtering configuration
   */
  @ContentChild(NgxIntellegensGridFilteringDefDirective, {static: false} )
  public filteringDef: NgxIntellegensGridFilteringDefDirective;

  @ViewChild(MatPaginator, { static: false }) protected paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) protected sort: MatSort;
  //#endregion

  //#region Properties

  /**
   * Configuration: Makes configuration available as public
   */
  public get configuration () {
    return this.config;
  }
  // Configuration: Holds internal configuration instance
  protected config = new GridConfiguration(() => this.dataKeys);

  /**
   * Gets current state of the grid
   */
  public get state () {
    return this.composeState({});
  }

  // Data source: Data resolved from [dataSource]
  protected data: any[] = [];
  // Data source: Contains all found property keys in any of data items
  protected dataKeys: string[] = [];

  protected get columnKeys () {
    const virtualKeys = Object.keys(this.config.columns);
    return virtualKeys;
  }

  // Data source: If data-source set as Observable, this will keep a reference to the subscription
  // to this Observable (in case unsubscribe needed later)
  protected dataSourceSubscription: SubscriptionLike;

  // Holds internal errors
  protected internalError: Error = null;
  // Holds internal loading state
  protected internalLoading = false;

  // Ordering: Field key to order rows by
  protected orderingField: string;
  // Ordering: If ordering in ascending direction
  protected orderingAscDirection = true;

  // Pagination: Current page's index
  protected pageIndex: number;
  // Pagination: Each page's size (number of rows displayed per page)
  protected pageLength: number;
  // Pagination: Total number of rows in current data
  protected totalLength: number;

  // Filtering: Hash-table of filtering key-value pairs
  // where key is the property key of the property being filtered by and value is the filtering value
  protected filters = {};

  //#endregion

  //#region Component life-cycle

  public ngAfterContentInit () {

    // Initialize columns' configuration
    this.config.columns = GridColumnConfiguration.create(this.columnDefs);

    // Initialize pagination configuration
    this.config.pagination = GridPaginationConfiguration.create(this.paginationDef);
    // Set initial page size
    if (this.config.pagination.hasPagination !== false) {
      this.pageLength = this.config.pagination.defaultPageLength;
    } else {
      this.pageLength = this.totalLength;
    }

    // Initialize filtering configuration
    this.config.filtering = GridFilteringConfiguration.create(this.filteringDef);
    // Disable filtering if all columns have filtering explicitly disabled
    this.config.filtering.hasFilteringColumns = (!Object.values(this.config.columns).length)
                                              || !!Object.values(this.config.columns)
                                                    .find((columnConf: GridColumnConfiguration) => columnConf.hasFiltering);

  }

  public ngOnChanges (changes: SimpleChanges) {
    // On [dataSource] change, resolve new data source data
    if (changes.dataSource) {

      // Clean internalError from previous data source if they exist
      this.internalError = null;
      // Clear internalLoading
      this.internalLoading = false;
      // Unsubscribe from previous dataSource if subscription exists
      if (this.dataSourceSubscription) {
        this.dataSourceSubscription.unsubscribe();
      }

      // Ingest dataSource
      if (this.dataSource instanceof Promise) {
        // Ingest Promise of data
        this.ingestPromiseData();
      } else if (this.dataSource instanceof Observable) {
        // Ingest Observable data
        this.ingestObservableData();
      } else {
        // Ingest raw data
        this.ingestRawData();
      }

    }
  }

  public ngOnDestroy () {
    // Unsubscribe from previous dataSource if subscription exists
    if (this.dataSourceSubscription) {
      this.dataSourceSubscription.unsubscribe();
    }
  }

  //#endregion

  //#region Exposed methods for managing the component

  /**
   * Updates ordering state and triggers (changed) event
   * @param orderingField Field key to order rows by
   * @param orderingAscDirection If ordering in ascending direction
   * @returns Promise promise of changes having been applied
   */
  public updateOrdering ({
    orderingField         = undefined as string,
    orderingAscDirection  = undefined as boolean
  }) {
    // Update state
    return this.doUpdateOrdering({ orderingField, orderingAscDirection })
      .then(() => {
        // Trigger (changed) event
        this.triggerChangedEvent({});
      });
  }

  /**
   * Updates pagination state and triggers (changed) event
   * @param pageIndex Current page's index
   * @param totalLength Total number of rows in current data
   * @returns Promise promise of changes having been applied
   */
  public updatePagination ({
    pageIndex   = undefined as number,
    totalLength = undefined as number
  }) {
    // Update state
    return this.doUpdatePagination({ pageIndex, totalLength })
      .then(() => {
        // Trigger (changed) event
        this.triggerChangedEvent({});
      });
  }

  /**
   * Updates filtering state and triggers (changed) event
   * @param key Property key of the property being filtered by
   * @param value Filtering value (if null, filtering by this property will be dropped)
   * @returns Promise promise of changes having been applied
   */
  public updateFiltering (key: string, value: any) {
    // Update state
    return this.doUpdateFiltering(key, value)
      .then(() => {
        // Trigger (changed) event
        this.triggerChangedEvent({});
      });
  }

  //#endregion

  //#region <mat-table /> and other UI events' handlers

  /**
   * Handles <mat-table /> (UI triggered) sorting change
   * @param e Sorting event descriptor object
   */
  protected onMatTableSort (e) {
    // Extract updated ordering values
    const orderingField: string = e.active;
    const orderingAscDirection = !(e.direction === 'asc');
    // Trigger (changed) event with updated values
    const preventedDefault = this.triggerChangedEvent({ orderingField, orderingAscDirection });
    // If change unhandled, handle state update internally (else, assume change will be handled externally)
    if (!preventedDefault) {
      // Apply updated state
      this.orderingField = orderingField;
      this.orderingAscDirection = orderingAscDirection;
      // Resetting pagination because of sorting
      this.paginator.firstPage();
    }
  }

  /**
   * Handles <mat-table /> (UI triggered) pagination change
   * @param e Pagination event descriptor object
   */
  protected onMatTablePage (e) {
    // Extract updated ordering values
    const pageIndex: number = e.pageIndex;
    const pageLength: number = e.pageSize;
    const previousPageIndex: number = e.previousPageIndex;
    // Trigger (changed) event with updated values
    const preventedDefault = this.triggerChangedEvent({ pageLength, pageIndex, previousPageIndex });
    // If change unhandled, handle state update internally (else, assume change will be handled externally)
    if (!preventedDefault) {
      // Apply updated state
      this.pageIndex = pageIndex;
      this.pageLength = pageLength;
    }
  }

  /**
   * Handles (UI triggered) filter value update
   * @param key Property key of the data property being filtered
   * @param e Event descriptor object
   */
  protected onFilterUpdated (key, e: any) {
    // Extract updated ordering values
    const value: string = e.target.value,
          updatedFilters = { ...this.filters, [key]: value };
    if (value === undefined || value === null || value === '') {
      delete updatedFilters[key];
    }
    const totalLength = (new FilterByPipe()).transform(this.data, updatedFilters).length;
    // Trigger (changed) event with updated values
    const preventedDefault = this.triggerChangedEvent({ filters: updatedFilters, totalLength });
    // If change unhandled, handle state update internally (else, assume change will be handled externally)
    if (!preventedDefault) {
      // Apply updated state
      if (value === undefined || value === null || value === '') {
        delete this.filters[key];
      } else {
        this.filters[key] = value;
      }
      this.totalLength = totalLength;
      // Resetting pagination because of filtering
      this.paginator.firstPage();
    }
  }

  //#endregion

  //#region Internal methods

  /**
   * Takes raw data from [dataSource] and ingests it into the component
   */
  protected ingestRawData () {

    // Check if [dataSource] is a Promise
    if (!(this.dataSource instanceof Array)) { return; }

    // Set data as raw data source value
    this.data = this.dataSource;
    // Extract all data keys from data
    this.dataKeys = (this.data && this.data.length ? Object.keys(this.data[0]) : []);
    // Reset pagination
    this.pageIndex = 0;
    this.totalLength = (new FilterByPipe()).transform(this.data, this.filters).length;

  }

  /**
   * Takes Promise of data from [dataSource] and (once resolved) ingests it into the component
   */
  protected ingestPromiseData () {

    // Check if [dataSource] is a Promise
    if (!(this.dataSource instanceof Promise)) { return; }

    // Set loading status
    this.internalLoading = true;

    // Resolve Promise data-source
    this.dataSource
      .then(
        (data) => {
          // Set resolved data
          this.data = data;
          // Extract all data keys from data
          this.dataKeys = (this.data && this.data.length ? Object.keys(this.data[0]) : []);
          // Reset pagination
          this.pageIndex = 0;
          this.totalLength = (new FilterByPipe()).transform(data, this.filters).length;
        }
      )
      .catch ((err) => {
        // Handle Promise resolution error
        this.handleInternalError(err);
      })
      .finally(() => {
        // Reset loading status
        this.internalLoading = false;
      });

  }

  /**
   * Takes Observable data from [dataSource] and (once resolved) ingests it into the component
   */
  protected ingestObservableData () {

    // Check if [dataSource] is a Promise
    if (!(this.dataSource instanceof Observable)) { return; }

    // Set loading status
    this.internalLoading = true;

    // Resolve RxJs Observable data-source
    this.dataSourceSubscription = this.dataSource.subscribe(
      (data) => {
        // Set resolved data
        this.data = data;
        // Extract all data keys from data
        this.dataKeys = (this.data && this.data.length ? Object.keys(this.data[0]) : []);
        // Reset pagination
        this.pageIndex = 0;
        this.totalLength = (new FilterByPipe()).transform(data, this.filters).length;
        // Reset loading status
        this.internalLoading = false;
      },
      (err) => {
        // Handle Observable resolution error
        this.handleInternalError(err);
        // Reset loading status
        this.internalLoading = false;
      }
    );

  }

  /**
   * Handles any error caught during internal operation of the Grid component
   * @param err Error being handled
   */
  protected handleInternalError (err) {
    this.internalError = err;
  }

  /**
   * Triggers the (changed) event with state information about to be applied
   * @param orderingField Updated value of the field key to order rows by
   * @param orderingAscDirection Updated value of if ordering in ascending direction
   * @param pageIndex Updated value of current page's index
   * @param previousPageIndex Updated value of previous page's index
   * @param totalLength Total number of rows in updated data
   * @param filters Updated value of the hash-table of filtering key-value pairs
   * @returns If internal processing of changes should be prevented and external handling should be assumed
   */
  protected triggerChangedEvent ({
    orderingField         = undefined as string,
    orderingAscDirection  = undefined as boolean,
    pageIndex             = undefined as number,
    previousPageIndex     = undefined as number,
    pageLength            = undefined as number,
    totalLength           = undefined as number,
    filters               = undefined as object
  }) {

    // Compose incoming state
    const state = this.composeState({
      orderingField,
      orderingAscDirection,
      pageIndex,
      previousPageIndex,
      pageLength,
      totalLength,
      filters
    });

    // Ready the change event descriptor object
    const e = {

      // Incoming state (separate copy, to protect from manipulation)
      state: {
        ...state,
        filters: {...filters}
      },

      // Methods to control the grid
      controller: {

        /**
         * Updates ordering state
         * @param orderingField Field key to order rows by
         * @param orderingAscDirection If ordering in ascending direction
         * @returns Promise promise of changes having been applied
         */
        updateOrdering: ({
          // tslint:disable-next-line: no-shadowed-variable
          orderingField         = state.orderingField as string,
          // tslint:disable-next-line: no-shadowed-variable
          orderingAscDirection  = state.orderingAscDirection as boolean
        }) => {
          // Trigger ordering update (avoiding (re)triggering (changed) event)
          return this.doUpdateOrdering({ orderingField, orderingAscDirection });
        },

        /**
         * Updates pagination state
         * @param pageIndex Current page's index
         * @param totalLength Total number of rows in current data
         * @returns Promise promise of changes having been applied
         */
        updatePagination: ({
          // tslint:disable-next-line: no-shadowed-variable
          pageIndex   = state.pageIndex as number,
          // tslint:disable-next-line: no-shadowed-variable
          totalLength = state.totalLength as number
        }) => {
          // Trigger ordering update (avoiding (re)triggering (changed) event)
          this.doUpdatePagination({ pageIndex, totalLength });
        },

        /**
         * Updates filtering state
         * @param key Property key of the property being filtered by
         * @param value Filtering value (if null, filtering by this property will be dropped)
         * @returns Promise promise of changes having been applied
         */
        updateFiltering:  (key, value) => {
          // Trigger ordering update (avoiding (re)triggering (changed) event)
          this.doUpdateFiltering(key, value);
        },

      },

      // Editable property signaling state is being managed by an outside party and doesn't need to be updated internally
      preventDefault:       false

    };

    // Emit (changed) event
    this.changed.emit(e);

    // Return if state being handled by an outside party
    return e.preventDefault;

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
  protected composeState ({
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
      orderingField:        orderingField !== undefined ? orderingField : this.orderingField,
      orderingAscDirection: orderingAscDirection !== undefined ? orderingAscDirection : this.orderingAscDirection,
      // Grid state (Pagination)
      pageIndex:            pageIndex !== undefined ? pageIndex : this.pageIndex,
      previousPageIndex,
      pageLength:           pageLength !== undefined ? pageLength : this.pageLength,
      totalLength:          totalLength !== undefined ? totalLength : this.totalLength,
      // Grid state (Filtration)
      filters:              filters !== undefined ? {...filters} : {...this.filters}
    };
  }

  /**
   * Updates ordering state
   * @param orderingField Field key to order rows by
   * @param orderingAscDirection If ordering in ascending direction
   * @returns Promise promise of changes having been applied
   */
  protected doUpdateOrdering ({
    orderingField         = undefined as string,
    orderingAscDirection  = undefined as boolean
  }) {
    return new Promise((resolve) => {
      // Allow for resolved data to get ingested before updating state
      setTimeout(() => {

        // Update ordering state
        this.orderingField =  orderingField !== undefined ? orderingField : this.orderingField;
        this.orderingAscDirection = orderingAscDirection !== undefined ? orderingAscDirection : this.orderingAscDirection;

        // Reflect ordering changes in <mat-table /> internal state
        // Ugly hack (fixing Material table issue: https://github.com/angular/components/issues/10242#issuecomment-470726829)
        const id = this.orderingField,
              start = (this.orderingAscDirection ? 'desc' : 'asc');
        if ((this.sort.active !== id) || ((this.sort as any)._direction !== start)) {
          this.sort.sort({ id, start } as MatSortable);
          const viewState = (this.sort.sortables.get(this.orderingField) as MatSortHeader)._getArrowViewState();
          if (viewState !== 'active') {
            (this.sort.sortables.get(this.orderingField) as MatSortHeader)._setAnimationTransitionState({ toState: 'active' });
          }
        }

        // Resolve promise
        resolve();

      });
    });
  }

  /**
   * Updates pagination state
   * @param pageIndex Current page's index
   * @param totalLength Total number of rows in current data
   * @returns Promise promise of changes having been applied
   */
  public doUpdatePagination ({
    pageIndex   = undefined as number,
    totalLength = undefined as number
  }) {
    return new Promise((resolve) => {
      // Allow for resolved data to get ingested before updating state
      setTimeout(() => {

        // Update pagination state
        this.pageIndex = pageIndex !== undefined ? pageIndex : this.pageIndex;
        this.totalLength = totalLength !== undefined ? totalLength : this.totalLength;

        // Reflect pagination changes in <mat-table /> internal state
        if (pageIndex !== undefined) {
          this.paginator.pageIndex = this.pageIndex;
        }

        // Resolve promise
        resolve();

      });
    });
  }

  /**
   * Updates filtering state
   * @param key Property key of the property being filtered by
   * @param value Filtering value (if null, filtering by this property will be dropped)
   * @returns Promise promise of changes having been applied
   */
  public doUpdateFiltering (key: string, value: any) {
    return new Promise((resolve) => {
      // Allow for resolved data to get ingested before updating state
      setTimeout(() => {

        // Update filter state
        if (value === undefined || value === null || value === '') {
          delete this.filters[key];
        } else {
          this.filters[key] = value;
        }

        // Resolve promise
        resolve();

      });
    });
  }

  //#endregion

}
