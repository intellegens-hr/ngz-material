// <ngx-intellegens-grid /> component module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

// Import directive
import { NgxIntellegensGridColumnDefDirective } from '../components/ngx-intellegens-grid/directives/ngxIntellegensGridColumnDef';
import { NgxIntellegensGridPaginationDefDirective } from '../components/ngx-intellegens-grid/directives/ngxIntellegensGridPaginationDef';
import { NgxIntellegensGridFilteringDefDirective } from '../components/ngx-intellegens-grid/directives/ngxIntellegensGridFilteringDef';

// Import components
import { NgxIntellegensGridComponent, SortBy, FilterBy, Pagination } from './ngx-intellegens-grid';
const components = [
  NgxIntellegensGridComponent,
  NgxIntellegensGridColumnDefDirective,
  NgxIntellegensGridPaginationDefDirective,
  NgxIntellegensGridFilteringDefDirective,
  SortBy,
  FilterBy,
  Pagination
];
const entryComponents = [
  NgxIntellegensGridComponent
];

@NgModule({
  declarations:     [ ...components ],
  imports:          [ CommonModule, MatTableModule, MatSortModule, MatPaginatorModule ],
  exports:          [ ...components ],
  entryComponents:  [ ...entryComponents ]
})
export class NgxIntellegensGridModule { }
