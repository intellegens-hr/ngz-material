// <ngx-intellegens-grid /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, OnChanges, Input } from '@angular/core';
import { isObservable, throwError } from 'rxjs';
import { isPromise } from '@angular/compiler/src/util';


@Component({
  selector: 'ngx-intellegens-grid',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class NgxIntellegensGridComponent {

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

  public ngOnChanges () {
     if (isPromise(this.dataSource)) {
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
      this.dataSource.subscribe(
        (dataSource) => {
          this.resolvedDataSource = dataSource;
        },
        (err) => {
          this.handleError(err);
        }
      );
    } else {
      this.resolvedDataSource = this.dataSource;
    }
  }

  public handleError (error) {

  }

}


