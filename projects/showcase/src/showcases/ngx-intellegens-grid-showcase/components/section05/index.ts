// <ngx-intellegens-grid-showcase-section-05 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

// Import example data
import { data } from '../../data';

@Component({
  selector: 'ngx-intellegens-grid-showcase-section-05',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridShowcaseSection05Component {

  // Holds display data
  public dataSource: any = data;

  // Holds example resolution error
  public err = new Error('Failed resolving data!');

  // Togglable loading status
  public isLoading = false;

  // Togglable error status
  public isError = false;

}
