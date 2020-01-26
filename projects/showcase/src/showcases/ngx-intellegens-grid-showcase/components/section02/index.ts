// <ngx-intellegens-grid-showcase-section-02 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

// Import example data
import { data, updateData } from '../../data';

@Component({
  selector: 'ngx-intellegens-grid-showcase-section-02',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridShowcaseSection02Component {

  // Holds display data
  public dataSource: any = data;

  // Holds example resolution error
  public err = new Error('Failed resolving data!');

  /**
   * Sets raw data object as dataSource
   */
  public generateDataSourceRaw () {
    this.dataSource = data;
  }

  /**
   * Generates a Promise resolving into the same raw data (or rejecting with provided error) after a timeout and sets it as dataSource
   * @param [err=null] If provided, error will be used to reject the returned Promise with
   */
  public generateDataSourcePromise (err: Error = null) {
    this.dataSource = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!err) {
          // Resolve raw data
          resolve(data);
        } else {
          // Reject with error
          reject(err);
        }
      }, 1000);
    });
  }

  /**
   * Generates an Observable resolving into the same raw data (or rejecting with provided error) after a timeout and sets it as dataSource
   * @param [err=null] If provided, error will be used to reject the returned Observable with
   */
  public generateDataSourceObservable (err: Error = null) {
    this.dataSource = new Observable((observer) => {
      let count = 0;
      const interval = setInterval(() => {
        if (!err) {
          if (count < 10) {
            // Resolve next version of data
            count++;
            observer.next(updateData(data, count));
          } else {
            // Finish updating data
            observer.complete();
            clearInterval(interval);
          }
        } else {
          // Reject with error
          observer.error(err);
        }
      }, 1000);
    });
  }
}
