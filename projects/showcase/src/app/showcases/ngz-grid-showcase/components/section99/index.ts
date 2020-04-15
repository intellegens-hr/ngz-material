// <ngz-grid-showcase-section-01 /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';

// Import example data
import { data } from '../../data';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'ngz-grid-showcase-section-next',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgzGridShowcaseSectionNextComponent {

  // Holds display data
  public dataSource: any = data;


 
}
