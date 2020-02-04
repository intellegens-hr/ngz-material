// <ngx-intellegens-grid-showcase-section-01 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';

// Import example data
import { data } from '../../data';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'ngx-intellegens-grid-showcase-section-next',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridShowcaseSectionNextComponent {

  // Holds display data
  public dataSource: any = data;


 
}
