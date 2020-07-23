// <ngz-grid-showcase-section-06 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '../../../../../../../ngz-material/src/lib';

// Import example data
import { data } from '../../data';

@Component({
  selector: 'ngz-grid-showcase-section-08',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgzGridShowcaseSection08Component {

  @ViewChild(GridComponent, { read: GridComponent })
  private grid: GridComponent;

  // Holds display data
  public dataSource: any = data.slice(0, 100);
  public dataLength: number;

  // holds select values
  public selectLastNameData = Array.from(new Set(data.map(x => x.lastName))).map(x => ({ text: x }));

  // Holds example resolution error
  public err = new Error('Failed resolving data!');

  // Togglable loading status
  public isLoading = false;

  // Togglable error status
  public isError = false;

  public onEventChange (e) {
    const preventDefault = false;

    if (preventDefault) {
      // Prevent default
      e.preventDefault();
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

  public avgMonthlySalary (ar) {
    let sum = 0;
    let avgSum = 0;
    for (let i = 0; i < ar.length; i++) {
      sum += ar[i];
    }
    return avgSum = Math.floor(sum / ar.length);
  }

  public avgMonthlySalaryLimited (ar, start, finish) {
    let sum = 0;
    let avgSum = 0;
    for (let i = start; i <= finish; i++) {
      sum += ar[i];
    }
    return avgSum = Math.floor(sum / ((finish + 1) - start));
  }
}
