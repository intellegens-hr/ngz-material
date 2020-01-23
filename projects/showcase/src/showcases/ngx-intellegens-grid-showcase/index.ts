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
  public testingReload = false;


  public dataSource = [
    { location: 1, firstName: 'Sophie', lastName: 'Myers', salary: 2000 },
    { location: 2, firstName: 'Judy', lastName: 'Herbert', salary: 1500 },
    { location: 3, firstName: 'Mike', lastName: 'Stewart', salary: 3753 },
    { location: 4, firstName: 'Judy', lastName: 'Brown', salary: 1700 },
    { location: 5, firstName: 'Bob', lastName: 'Melon', salary: 1100 },
    { location: 6, firstName: 'Sophie', lastName: 'Myers', salary: 2000 },
    { location: 7, firstName: 'Judy', lastName: 'Herbert', salary: 1500 },
    { location: 8, firstName: 'Mike', lastName: 'Stewart', salary: 3753 },
    { location: 9, firstName: 'Judy', lastName: 'Brown', salary: 1700 },
    { location: 10, firstName: 'Bob', lastName: 'Melon', salary: 1100 },
    { location: 11, firstName: 'Sophie', lastName: 'Myers', salary: 2000 },
    { location: 12, firstName: 'Judy', lastName: 'Herbert', salary: 1500 },
    { location: 13, firstName: 'Mike', lastName: 'Stewart', salary: 3753 },
    { location: 14, firstName: 'Judy', lastName: 'Brown', salary: 1700 },
    { location: 15, firstName: 'Bob', lastName: 'Melon', salary: 1100 },
    { location: 16, firstName: 'Sophie', lastName: 'Myers', salary: 2000 },
    { location: 17, firstName: 'Judy', lastName: 'Herbert', salary: 1500 },
    { location: 18, firstName: 'Mike', lastName: 'Stewart', salary: 3753 },
    { location: 19, firstName: 'Judy', lastName: 'Brown', salary: 1700 },
    { location: 20, firstName: 'Bob', lastName: 'Melon', salary: 1100 },
    { location: 21, firstName: 'Sophie', lastName: 'Myers', salary: 2000 },
    { location: 22, firstName: 'Judy', lastName: 'Herbert', salary: 1500 },
    { location: 23, firstName: 'Mike', lastName: 'Stewart', salary: 3753 },
    { location: 24, firstName: 'Judy', lastName: 'Brown', salary: 1700 },
    { location: 25, firstName: 'Bob', lastName: 'Melon', salary: 1100 },
    { location: 26, firstName: 'Sophie', lastName: 'Myers', salary: 2000 },
    { location: 27, firstName: 'Judy', lastName: 'Herbert', salary: 1500 },
    { location: 28, firstName: 'Mike', lastName: 'Stewart', salary: 3753 },
    { location: 29, firstName: 'Judy', lastName: 'Brown', salary: 1700 },
    { location: 30, firstName: 'Bob', lastName: 'Melon', salary: 1100 },
    { location: 31, firstName: 'Mike', lastName: 'Stewart', salary: 3753 },
    { location: 32, firstName: 'Judy', lastName: 'Brown', salary: 1700 },
    { location: 33, firstName: 'Bob', lastName: 'Melon', salary: 1100 }
  ];


  public dataSourcePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = JSON.parse(JSON.stringify(this.dataSource));
      resolve(data);
      // reject(new Error('I am an error'));
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


  public selected: any = this.dataSource;

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

  public toggleReload () {
    this.testingReload = !this.testingReload;
  }


  public dataSourceChange (e) {
    if (e.target.value === 'dataSourcePromise') {
      this.selected = this.dataSourcePromise;
    } else if (e.target.value === 'dataSourceObservable') {
      this.selected = this.dataSourceObservable;
    } else {
      this.selected = this.dataSource;
    }
  }
}
