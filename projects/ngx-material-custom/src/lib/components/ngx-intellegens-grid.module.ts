// <ngx-intellegens-grid /> component module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

// Import directive
import { NgxIntellegensGridColumnDefDirective } from '../components/ngx-intellegens-grid/directives/ngxIntellegensGridColumnDef';

// Import components
import { NgxIntellegensGridComponent, SortBy, FilterBy, Pagination } from './ngx-intellegens-grid';
const components = [
  NgxIntellegensGridComponent,
  NgxIntellegensGridColumnDefDirective,
  SortBy,
  FilterBy,
  Pagination
];
const entryComponents = [
  NgxIntellegensGridComponent
];

@NgModule({
  declarations:     [ ...components ],
  imports:          [ CommonModule, MatTableModule ],
  exports:          [ ...components ],
  entryComponents:  [ ...entryComponents ]
})
export class NgxIntellegensGridModule { }
