// <ngxIntellegensGridColumnDef /> directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[ngxIntellegensGridPaginationDef]'
})
export class NgxIntellegensGridPaginationDefDirective {

  @Input('ngxIntellegensGridPaginationDef')
  public key: string;

  @Input()
  public hasPagination: boolean;

  @Input()
  public defaultPageSize: number;

  @Input()
  public pageSizeOptions: [];

}

export class TablePaginationConfiguration {
  public key: string;
  public hasPagination = true;
  public defaultPageSize = 10;
  public pageSizeOptions = [10, 20, 50, 100];
}
