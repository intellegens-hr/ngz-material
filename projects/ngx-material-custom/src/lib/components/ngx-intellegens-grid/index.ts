// <ngx-intellegens-grid /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, AfterContentInit , OnChanges, OnDestroy, SimpleChanges, Input, ContentChildren, QueryList } from '@angular/core';
import { isObservable, SubscriptionLike } from 'rxjs';
import { isPromise } from '@angular/compiler/src/util';
import { NgxIntellegensGridColumnDefDirective, TableColumnConfiguration  } from './directives/ngxIntellegensGridColumnDef';

@Component({
  selector: 'ngx-intellegens-grid',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridComponent implements AfterContentInit, OnChanges, OnDestroy {

  private config = new TableConfiguration();

  @Input()
  public error?: any;
  private internalError?: any;

  @Input()
  public loading?: boolean;
  private internalLoading: boolean;

  @Input()
  public dataSource: any;
  private dataSourceSubscription: SubscriptionLike;
  private resolvedDataSource: any = [];
  public get resolvedDataSourceKeys () {
    return (this.resolvedDataSource && this.resolvedDataSource.length ? Object.keys(this.resolvedDataSource[0]) : []);
  }

  @ContentChildren(NgxIntellegensGridColumnDefDirective)
  public columnDefs: QueryList<NgxIntellegensGridColumnDefDirective>;

  public ngAfterContentInit (): void {
   this.columnDefs.forEach(element => {
      let columnConfig = new TableColumnConfiguration();
      columnConfig.key = element.key;
      columnConfig.header = element.header;
      columnConfig.footer = element.footer;
      this.config.columnDefinition[columnConfig.key] = columnConfig;
    });
   console.log(this.config);
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

}

class TableConfiguration {

  public columnDefinition: any = {};

}
