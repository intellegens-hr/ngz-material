// <ngz-grid /> component module
// ----------------------------------------------------------------------------

// Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
const modules = [
  CommonModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
];

// Import and (re)export directives
import {
  GridColumnDefDirective,
  GridColumnCellTemplateDirective,
  GridColumnHeaderCellTemplateDirective,
  GridColumnFooterCellTemplateDirective
} from './Grid/directives/GridColumnDef';
export {
  GridColumnDefDirective,
  GridColumnCellTemplateDirective,
  GridColumnHeaderCellTemplateDirective,
  GridColumnFooterCellTemplateDirective
};
import { GridPaginationDefDirective } from './Grid/directives/GridPaginationDef';
export { GridPaginationDefDirective };
import { GridFilteringDefDirective } from './Grid/directives/GridFilteringDef';
export { GridFilteringDefDirective };
import { GridInjectedContentDefDirective, GridInjectedContentTemplateDirective } from './Grid/directives/GridInjectedContentDef';
export { GridInjectedContentDefDirective, GridInjectedContentTemplateDirective };

// Import and (re)export components and pipes
import { GridComponent } from './Grid';
export { GridComponent };
import { OrderByPipe } from './Grid/pipes/OrderBy';
export { OrderByPipe };
import { PaginatePipe } from './Grid/pipes/Paginate';
export { PaginatePipe };
import { FilterByPipe } from './Grid/pipes/FilterBy';
export { FilterByPipe };
import { GridActionsComponent, GridActionComponent } from './Grid/components/GridActions';
export { GridActionsComponent, GridActionComponent };
const declarations = [
  GridComponent,
  GridColumnDefDirective,
  GridColumnCellTemplateDirective,
  GridColumnHeaderCellTemplateDirective,
  GridColumnFooterCellTemplateDirective,
  GridPaginationDefDirective,
  GridFilteringDefDirective,
  GridInjectedContentDefDirective,
  GridInjectedContentTemplateDirective,
  OrderByPipe,
  FilterByPipe,
  PaginatePipe,
  GridActionsComponent,
  GridActionComponent
];

/**
 * <ngz-grid /> component module
 */
@NgModule({
  imports:      [ ...modules ],
  declarations: [ ...declarations ],
  exports:      [ ...modules, ...declarations ],
})
export class GridModule { }
