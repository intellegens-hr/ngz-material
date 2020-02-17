// <ngx-intellegens-grid-showcase-section-06 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, ViewChild } from '@angular/core';
import { NgxIntellegensGridComponent } from '../../../../../../ngx-material-custom/src/lib';

// Import example data
import { data } from '../../data';

@Component({
  selector: 'ngx-intellegens-grid-showcase-section-07',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridShowcaseSection07Component {

  @ViewChild(NgxIntellegensGridComponent, { read: NgxIntellegensGridComponent })
  private grid: NgxIntellegensGridComponent;

  // Holds display data
  public dataSource: any = data;
  public dataLength: number;

  // Holds example resolution error
  public err = new Error('Failed resolving data!');

  // Togglable loading status
  public isLoading = false;

  // Togglable error status
  public isError = false;

  public onEventChange (e) {
    e.preventDefault = true;

    if (e.preventDefault) {
      // Set data (async)
      this.dataSource = new Promise((resolve) => {
        setTimeout(() => {
          // Sort and filter
          const filtered = data
            .filter(
              (a) => !Object.keys(e.state.filters).find(
                (key) => !(new RegExp(e.state.filters[key]).test(a[key]))
              )
            )
            .sort((a: any, b: any) => {
              if (a[e.state.orderingField] < b[e.state.orderingField]) {
                return (e.state.orderingAscDirection ? -1 : +1);
              } else if ( a[e.state.orderingField] > b[e.state.orderingField]) {
                return (e.state.orderingAscDirection ? +1 : -1);
              } else {
                return 0;
              }
            });
          // Paginate
          const paginated = filtered.slice(e.state.pageIndex * e.state.pageLength, (e.state.pageIndex + 1) * e.state.pageLength);
          // Set data length
          this.dataLength = filtered.length;
          // Set data
          resolve(paginated);
        }, 1000);
      });
    }
  }

  public sort (id, asc) {
    this.grid.updateOrdering({
      orderingField: id,
      orderingAscDirection: asc
    });
  }

  public page (page) {
    this.grid.updatePagination({
      pageIndex: (this.grid.state.pageIndex + page)
    });
  }

  public filter (id, value) {
    this.grid.updateFiltering(id, value);
  }

  public log () {
    console.log(this.grid);
  }

}
