// <ngx-intellegens-grid /> component module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

// Import and (re)export directives
import {
  NgxIntellegensGridColumnDefDirective,
  NgxIntellegensGridColumnCellTemplateDirective,
  NgxIntellegensGridColumnHeaderCellTemplateDirective,
  NgxIntellegensGridColumnFooterCellTemplateDirective
} from '../components/ngx-intellegens-grid/directives/ngxIntellegensGridColumnDef';
export {
  NgxIntellegensGridColumnDefDirective,
  NgxIntellegensGridColumnCellTemplateDirective,
  NgxIntellegensGridColumnHeaderCellTemplateDirective,
  NgxIntellegensGridColumnFooterCellTemplateDirective
};
import { NgxIntellegensGridPaginationDefDirective } from '../components/ngx-intellegens-grid/directives/ngxIntellegensGridPaginationDef';
export { NgxIntellegensGridPaginationDefDirective };
import { NgxIntellegensGridFilteringDefDirective } from '../components/ngx-intellegens-grid/directives/ngxIntellegensGridFilteringDef';
export { NgxIntellegensGridFilteringDefDirective };

// Import and (re)export components and pipes
import { NgxIntellegensGridComponent } from './ngx-intellegens-grid';
export { NgxIntellegensGridComponent };
import { OrderByPipe } from './ngx-intellegens-grid/pipes/orderBy';
export { OrderByPipe };
import { PaginatePipe } from './ngx-intellegens-grid/pipes/pagination';
export { PaginatePipe };
import { FilterByPipe } from './ngx-intellegens-grid/pipes/filterBy';
export { FilterByPipe };
const components = [
  NgxIntellegensGridComponent,
  NgxIntellegensGridColumnDefDirective,
  NgxIntellegensGridColumnCellTemplateDirective,
  NgxIntellegensGridPaginationDefDirective,
  NgxIntellegensGridColumnHeaderCellTemplateDirective,
  NgxIntellegensGridColumnFooterCellTemplateDirective,
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
