// <ngz-grid /> component module
// ----------------------------------------------------------------------------

// Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
const imports = [
  CommonModule, MatTableModule, MatSortModule, MatPaginatorModule
];

// Import and (re)export directives
import {
  NgzGridColumnDefDirective,
  NgzGridColumnCellTemplateDirective,
  NgzGridColumnHeaderCellTemplateDirective,
  NgzGridColumnFooterCellTemplateDirective
} from '../components/ngz-grid/directives/ngzGridColumnDef';
export {
  NgzGridColumnDefDirective,
  NgzGridColumnCellTemplateDirective,
  NgzGridColumnHeaderCellTemplateDirective,
  NgzGridColumnFooterCellTemplateDirective
};
import { NgzGridPaginationDefDirective } from '../components/ngz-grid/directives/ngzGridPaginationDef';
export { NgzGridPaginationDefDirective };
import { NgzGridFilteringDefDirective } from '../components/ngz-grid/directives/ngzGridFilteringDef';
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
const declarations = [
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

/**
 * <ngz-grid /> component module
 */
@NgModule({
  imports,
  declarations,
  exports: [ ...imports, ...declarations ],
})
export class NgzGridModule { }
