// <ngx-intellegens-grid-showcase-section-06 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

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
    console.log('hey this happened', e);
    e.handleChange = false;

    if (!e.handleChange) {

      // Set data
      // const temp = data.slice(e.pageIndex * e.pageSize, (e.pageIndex + 1) * e.pageSize);
      // this.dataSource = temp;
      setTimeout(() => {
        e.grid.updatePagination({ numOfItems: data.length });
      });

      this.dataSource = new Promise((resolve) => {
        setTimeout(() => {
          // Set data
          const temp = data.slice(e.pageIndex * e.pageSize, (e.pageIndex + 1) * e.pageSize);
          resolve(temp);
          setTimeout(() => {
            e.grid.updatePagination({ numOfItems: data.length });
          });
          // Set state
          // e.grid.updateSort({orderField: 'salary', orderDirection: true});
        }, 1000);
      });
    }
  }

}
