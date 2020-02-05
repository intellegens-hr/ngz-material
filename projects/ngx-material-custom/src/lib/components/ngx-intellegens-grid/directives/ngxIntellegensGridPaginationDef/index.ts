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
  public defaultPageLength: number;

  @Input()
  public pageLengthOptions: [];

}

export class TablePaginationConfiguration {
  public static create (def) {
    const config = new TablePaginationConfiguration();
    if (def) {
      if (def.hasPagination !== undefined) {
        config.hasPagination = def.hasPagination;
      }
      if (def.defaultPageLength !== undefined) {
        config.defaultPageLength = def.defaultPageLength;
      }
      if (def.pageLengthOptions !== undefined) {
        config.pageLengthOptions = def.pageLengthOptions;
      }
    }
    return config;
  }

  public hasPagination = true;
  public defaultPageLength = 10;
  public pageLengthOptions = [10, 30, 50, 100];
}
