// <ngx-intellegens-grid-showcase-section-06 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';

// Import example data
import { data } from '../../data';

@Component({
  selector: 'ngx-intellegens-grid-showcase-section-07',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridShowcaseSection07Component {

  // Holds display data
  public dataSource: any = data;

  // Holds example resolution error
  public err = new Error('Failed resolving data!');

  // Togglable loading status
  public isLoading = false;

  // Togglable error status
  public isError = false;

  public onEventChange (e) {
    e.preventDefault = false;

    if (e.preventDefault) {

      // Set data (sync)
      // const temp = data.slice(e.pageIndex * e.pageLength, (e.pageIndex + 1) * e.pageLength);
      // this.dataSource = temp;
      // e.grid.updatePagination({ totalLength: data.length });

      // Set data (async)
      this.dataSource = new Promise((resolve) => {
        setTimeout(() => {
          // Set data
          const temp = data.slice(e.pageIndex * e.pageLength, (e.pageIndex + 1) * e.pageLength);
          e.grid.updatePagination({ totalLength: data.length});
          e.grid.updateOrdering({ orderingField: 'salary', orderingAscDirection: true });
          resolve(temp);
        }, 1000);
      });
    }
  }

}
