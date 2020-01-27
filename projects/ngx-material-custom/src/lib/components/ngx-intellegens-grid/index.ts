// <ngx-intellegens-grid /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, AfterContentInit , OnChanges, OnDestroy, SimpleChanges, Input, ContentChildren, QueryList, Pipe, PipeTransform, HostListener, ContentChild } from '@angular/core';
import { isObservable, SubscriptionLike } from 'rxjs';
import { isPromise } from '@angular/compiler/src/util';
import { NgxIntellegensGridColumnDefDirective, TableColumnConfiguration  } from './directives/ngxIntellegensGridColumnDef';
import { NgxIntellegensGridPaginationDefDirective, TablePaginationConfiguration  } from './directives/ngxIntellegensGridPaginationDef';

@Component({
  selector: 'ngx-intellegens-grid',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridComponent implements AfterContentInit, OnChanges, OnDestroy {
  public get resolvedDataSourceKeys () {
    return (this.resolvedDataSource && this.resolvedDataSource.length ? Object.keys(this.resolvedDataSource[0]) : []);
  }

  public config = new TableConfiguration();

  @Input()
  public error?: any;
  private internalError?: any;

  @Input()
  public loading?: boolean;
  private internalLoading: boolean;

  public orderField: string;
  public orderDirection = true;

  public filters = {firstName: 'Judy'};

  public pageIndex = 0;
  public pageSize = 10;
  public numOfItems: number;
  public previousPageIndex: number;

  @Input()
  public dataSource: any;
  private dataSourceSubscription: SubscriptionLike;
  private resolvedDataSource: any = [];

  @ContentChildren(NgxIntellegensGridColumnDefDirective)
  public columnDefs: QueryList<NgxIntellegensGridColumnDefDirective>;

  @ContentChild(NgxIntellegensGridPaginationDefDirective, {static: false} )
  public paginationDef: NgxIntellegensGridPaginationDefDirective;

  public ngAfterContentInit (): void {
   this.columnDefs.forEach(element => {
      let columnConfig = new TableColumnConfiguration();
      columnConfig.key = element.key;
      columnConfig.header = element.header;
      columnConfig.footer = element.footer;
      columnConfig.sortable = element.sortable;
      this.config.columnDefinition[columnConfig.key] = columnConfig;
    });

   if (this.paginationDef) {
      let paginationConfig = new TablePaginationConfiguration();
      paginationConfig.hasPagination = true;
      paginationConfig.key = this.paginationDef.key;
      paginationConfig.defaultPageSize = this.paginationDef.defaultPageSize;
      paginationConfig.pageSizeOptions = this.paginationDef.pageSizeOptions;
      this.config.pagination[paginationConfig.key] = paginationConfig;
   }
  }

  public ngOnChanges (changes: SimpleChanges) {
    // On [dataSource] change, resolve new data-source
    if (changes.dataSource) {
      // Clean internalErrors from previous dataSource if they exist
      this.internalError = null;
      // Set internalLoading to false
      this.internalLoading = false;
      // Unsubscribe from previous dataSource if it exists
      if (this.dataSourceSubscription) {
        this.dataSourceSubscription.unsubscribe();
      }
      // Resolve dataSource
      if (isPromise(this.dataSource)) {

        this.internalLoading = true;
        // Resolve Promise data-source
        // TODO: use async/await
        this.dataSource.then(
          (dataSource) => {
            this.resolvedDataSource = dataSource;
            this.internalLoading = false;
          },
          (err) => {
            this.handleInternalErrors(err);
            this.internalLoading = false;
          }
        );

      } else if (isObservable(this.dataSource)) {

        this.internalLoading = true;
        // Resolve RxJs Observable data-source
        this.dataSourceSubscription = this.dataSource.subscribe(
          (dataSource) => {
            this.resolvedDataSource = dataSource;
            this.internalLoading = false;
          },
          (err) => {
            this.handleInternalErrors(err);
            this.internalLoading = false;
          }
        );

      } else {

        // Use resolved, direct data-source
        this.resolvedDataSource = this.dataSource;

      }
    }
    let filterBy = new FilterBy();
    this.numOfItems = filterBy.transform(this.resolvedDataSource, this.filters).length;
  }


  public ngOnDestroy () {
    // Unsubscribe from previous dataSource if it exists
    if (this.dataSourceSubscription) {
     this.dataSourceSubscription.unsubscribe();
    }
  }

  public handleInternalErrors (err) {
    this.internalError = err;
  }

    public sortChange (e) {
      this.orderField = e.active;
      this.orderDirection = (e.direction === 'asc' ? true : false);
    }

    public pageChange (e) {
      this.pageIndex = e.pageIndex;
      this.pageSize = e.pageSize;
      this.previousPageIndex = e.previousPageIndex;
    }

}

class TableConfiguration {

  public columnDefinition: any = {};
  public pagination: any = {};
}

@Pipe({name: 'sortBy'})
export class SortBy implements PipeTransform {
  public transform (array: any, field: any, ascOrder: boolean): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if ( a[field] > b[field]) {
        return 1;
      } else {
         return 0;
       }
    });
    if (!ascOrder) {
      return [...array.reverse()];
    } else {
      return [...array];
    }
  }
}

@Pipe({name: 'filterBy',  pure: false})
export class FilterBy  implements PipeTransform {
   public  transform (items: any, filter: any): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      return items.filter(item =>
        filterKeys.reduce((memo, keyName) =>
          (memo && new RegExp(filter[keyName]).test(item[keyName])) || filter[keyName] === '', true));
    } else {
      return items;
    }
  }
}

@Pipe({name: 'pagination'})
export class Pagination  implements PipeTransform {
   public transform (items: any, pageSize: number, pageIndex: number) {
     let slicedArray = [];
     let startingPoint = pageIndex * pageSize;
     let endPoint = startingPoint + pageSize;
     if (startingPoint > items.length) {
      startingPoint = items.length - items.length % pageSize;
     }
     if (startingPoint === items.length) {
      startingPoint = items.length - pageSize;
     }
     slicedArray = items.slice(startingPoint, endPoint);
     return slicedArray;
  }
}
