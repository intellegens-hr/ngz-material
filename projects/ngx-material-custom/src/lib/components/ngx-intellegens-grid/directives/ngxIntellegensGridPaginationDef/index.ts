// <ngxIntellegensGridPaginationDef /> directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[ngxIntellegensGridPaginationDef]'
})
export class NgxIntellegensGridPaginationDefDirective {

  @Input()
  public hasPagination: boolean;

  @Input()
  public defaultPageSize: number;

  @Input()
  public pageSizeOptions: [];

}

export class TablePaginationConfiguration {
  public static create (def) {
    const config = new TablePaginationConfiguration();
    if (def) {
      if (def.hasPagination !== undefined) {
        config.hasPagination = def.hasPagination;
      }
      if (def.defaultPageSize !== undefined) {
        config.defaultPageSize = def.defaultPageSize;
      }
      if (def.pageSizeOptions !== undefined) {
        config.pageSizeOptions = def.pageSizeOptions;
      }
    }
    return config;
  }

  public hasPagination = true;
  public defaultPageSize = 10;
  public pageSizeOptions = [10, 30, 50, 100];
}
