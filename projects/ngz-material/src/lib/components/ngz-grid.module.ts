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
} from '../components/Grid/directives/ngzGridColumnDef';
export {
  NgzGridColumnDefDirective,
  NgzGridColumnCellTemplateDirective,
  NgzGridColumnHeaderCellTemplateDirective,
  NgzGridColumnFooterCellTemplateDirective
};
import { NgzGridPaginationDefDirective } from '../components/Grid/directives/ngzGridPaginationDef';
export { NgzGridPaginationDefDirective };
import { NgzGridFilteringDefDirective } from '../components/Grid/directives/ngzGridFilteringDef';
export { NgzGridFilteringDefDirective };

// Import and (re)export components and pipes
import { GridComponent } from './Grid';
export { GridComponent };
import { OrderByPipe } from './Grid/pipes/orderBy';
export { OrderByPipe };
import { PaginatePipe } from './Grid/pipes/pagination';
export { PaginatePipe };
import { FilterByPipe } from './Grid/pipes/filterBy';
export { FilterByPipe };
const declarations = [
  GridComponent,
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
