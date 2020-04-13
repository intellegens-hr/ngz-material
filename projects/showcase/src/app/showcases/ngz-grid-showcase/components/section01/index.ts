// <ngz-grid-showcase-section-01 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';

// Import example data
import { data } from '../../data';

@Component({
  selector: 'ngz-grid-showcase-section-01',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgzGridShowcaseSection01Component {

  // Holds display data
  public dataSource: any = data;

}
