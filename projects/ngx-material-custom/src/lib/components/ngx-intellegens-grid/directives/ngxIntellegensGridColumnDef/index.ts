// <ngxIntellegensGridColumnDef /> directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[ngxIntellegensGridColumnDef]'
})


export class ngxIntellegensGridColumnDef {

  @Input('ngxIntellegensGridColumnDef')
  public key: string;

  @Input()
  public sortable: boolean;

  @Input()
  public sortableAs: any;

  @Input()
  public header: string;

  @Input()
  public footer: string;

}
