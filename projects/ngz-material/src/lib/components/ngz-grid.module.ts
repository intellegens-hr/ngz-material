// <ngz-grid /> component module
// ----------------------------------------------------------------------------

// Import dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

// Import and (re)export directives
import {
  NgzGridColumnDefDirective,
  NgzGridColumnCellTemplateDirective,
  NgzGridColumnHeaderCellTemplateDirective,
  NgzGridColumnFooterCellTemplateDirective
} from '../components/ngz-grid/directives/NgzGridColumnDef';
export {
  NgzGridColumnDefDirective,
  NgzGridColumnCellTemplateDirective,
  NgzGridColumnHeaderCellTemplateDirective,
  NgzGridColumnFooterCellTemplateDirective
};
import { NgzGridPaginationDefDirective } from '../components/ngz-grid/directives/NgzGridPaginationDef';
export { NgzGridPaginationDefDirective };
import { NgzGridFilteringDefDirective } from '../components/ngz-grid/directives/NgzGridFilteringDef';
export { NgzGridFilteringDefDirective };

// Import and (re)export components and pipes
import { NgzGridComponent } from './ngz-grid';
export { NgzGridComponent };
import { OrderByPipe } from './ngz-grid/pipes/orderBy';
export { OrderByPipe };
import { PaginatePipe } from './ngz-grid/pipes/pagination';
export { PaginatePipe };
import { FilterByPipe } from './ngz-grid/pipes/filterBy';
export { FilterByPipe };
const components = [
  NgzGridComponent,
  NgzGridColumnDefDirective,
  NgzGridColumnCellTemplateDirective,
  NgzGridPaginationDefDirective,
  NgzGridColumnHeaderCellTemplateDirective,
  NgzGridColumnFooterCellTemplateDirective,
  NgzGridFilteringDefDirective,
  OrderByPipe,
  FilterByPipe,
  PaginatePipe
];
const entryComponents = [
  NgzGridComponent
];

/**
 * <ngz-grid /> component module
 */
@NgModule({
  declarations:     [ ...components ],
  imports:          [ CommonModule, MatTableModule, MatSortModule, MatPaginatorModule ],
  exports:          [ ...components ],
  entryComponents:  [ ...entryComponents ]
})
export class NgzGridModule { }
