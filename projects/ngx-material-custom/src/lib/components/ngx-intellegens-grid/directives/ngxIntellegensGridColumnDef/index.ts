// <ngxIntellegensGridColumnDef /> directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[ngxIntellegensGridColumnDef]'
})
export class NgxIntellegensGridColumnDefDirective {

  @Input('ngxIntellegensGridColumnDef')
  public key: string;

  @Input()
  public header: string;

  @Input()
  public footer: string;

  @Input()
  public sortable: boolean;

}

export class TableColumnConfiguration {
  public key: string;
  public header: string;
  public footer: string;
  public sortable: boolean;
}
