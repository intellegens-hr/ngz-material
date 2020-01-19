// <ngx-intellegens-grid /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { isObservable, throwError } from 'rxjs';
import { isPromise } from '@angular/compiler/src/util';


@Component({
  selector: 'ngx-intellegens-grid',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class NgxIntellegensGridComponent implements OnChanges {

  @Input()
  public dataSource: any;

  @Input()
  public error?: any;

  @Input()
  public loading?: boolean;

  private resolvedDataSource: any = [];
  public get resolvedDataSourceKeys () {
    return (this.resolvedDataSource && this.resolvedDataSource.length ? Object.keys(this.resolvedDataSource[0]) : []);
  }

  public ngOnChanges (changes: SimpleChanges) {
    // On [dataSource] change, resolve new data-source
    if (changes.dataSource) {
      if (isPromise(this.dataSource)) {

        // Resolve Promise data-source
        // TODO: use async/await
        this.dataSource.then(
          (dataSource) => {
            this.resolvedDataSource = dataSource;
          },
          (err) => {
            this.handleError(err);
          }
        );

      } else if (isObservable(this.dataSource)) {

        // Resolve RxJs Observable data-source
        this.dataSource.subscribe(
          (dataSource) => {
            this.resolvedDataSource = dataSource;
          },
          (err) => {
            this.handleError(err);
          }
        );

      } else {

        // Use resolved, direct data-source
        this.resolvedDataSource = this.dataSource;

      }
    }
  }

  public handleError (error) {

  }

}


