// <ngx-intellegens-grid-showcase /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridShowcaseComponent {

  public testingError: Error = null;
  public testingLoading = false;

  public dataSource = [
    { location: 1, firstName: 'Marko', lastName: 'Horvat', salary: 2000 },
    { location: 2, firstName: 'Ivo', lastName: 'Balija', salary: 1500 },
    { location: 3, firstName: 'Martina', lastName: 'Posavec', salary: 3753 },
    { location: 4, firstName: 'Marko', lastName: 'Horvat', salary: 1700 },
  ];


  public dataSourcePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = JSON.parse(JSON.stringify(this.dataSource));
      resolve(data);
      //reject(new Error('I am an error'));
    }, 1000);
  });

  public dataSourceObservable = new Observable((subscriber) => {
    let count = 0,
        interval = setInterval(() => {
          if (count < 10) {
            const data = JSON.parse(JSON.stringify(this.dataSource));
            subscriber.next(
              this.updateDataSource(data, count)
            );
            count++;
          } else {
            subscriber.complete();
            clearInterval(interval);
            // subscriber.error((new Error('I am an error')));
            // clearInterval(interval);
          }
        }, 1000);
  });


  public updateDataSource (dataSource, i) {
    for (let row of dataSource) {
      row.location += i;
    }
    return dataSource;
  }

  public toggleError () {
    this.testingError = (this.testingError ? null : new Error('Really, I am an error!'));
  }
  public toggleLoading () {
    this.testingLoading = !this.testingLoading;
  }

}
