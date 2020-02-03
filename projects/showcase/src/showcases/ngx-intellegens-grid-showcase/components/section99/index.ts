// <ngx-intellegens-grid-showcase-section-01 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';

// Import example data
import { data } from '../../data';

@Component({
  selector: 'ngx-intellegens-grid-showcase-section-next',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridShowcaseSectionNextComponent {

  // Holds display data
  public dataSource: any = data;


  public onEventChange (e) {
    console.log('hey this happened', e);
    e.handleChange = true;
  }
}
