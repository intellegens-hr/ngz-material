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
import { NgxIntellegensGridComponent } from './ngx-intellegens-grid';
import { OrderByPipe } from './ngx-intellegens-grid/pipes/orderBy';
import { PaginatePipe } from './ngx-intellegens-grid/pipes/pagination';
import { FilterByPipe } from './ngx-intellegens-grid/pipes/filterBy';
const components = [
  NgxIntellegensGridComponent,
  NgxIntellegensGridColumnDefDirective,
  NgxIntellegensGridPaginationDefDirective,
  NgxIntellegensGridFilteringDefDirective,
  OrderByPipe,
  FilterByPipe,
  PaginatePipe
];
const entryComponents = [
  NgxIntellegensGridComponent
];

/**
 * <ngx-intellegens-grid /> component module
 */
@NgModule({
  declarations:     [ ...components ],
  imports:          [ CommonModule, MatTableModule, MatSortModule, MatPaginatorModule ],
  exports:          [ ...components ],
  entryComponents:  [ ...entryComponents ]
})
export class NgxIntellegensGridModule { }
