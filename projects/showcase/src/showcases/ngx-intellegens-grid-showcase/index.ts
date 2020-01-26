// <ngx-intellegens-grid-showcase /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';

// Export child components
import { NgxIntellegensGridShowcaseSection01Component } from './components/section01';
import { NgxIntellegensGridShowcaseSection02Component } from './components/section02';
import { NgxIntellegensGridShowcaseSection03Component } from './components/section03';
import { NgxIntellegensGridShowcaseSectionNextComponent } from './components/section99';
export const components = [
  NgxIntellegensGridShowcaseSection01Component,
  NgxIntellegensGridShowcaseSection02Component,
  NgxIntellegensGridShowcaseSection03Component,
  NgxIntellegensGridShowcaseSectionNextComponent
];

@Component({
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgxIntellegensGridShowcaseComponent {}
