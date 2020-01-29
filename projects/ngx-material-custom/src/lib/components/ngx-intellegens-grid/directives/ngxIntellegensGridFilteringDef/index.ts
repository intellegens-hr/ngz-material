// <ngxIntellegensGridPaginationDef /> directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[ngxIntellegensGridFilteringDef]'
})
export class NgxIntellegensGridFilteringDefDirective {

  @Input()
  public hasFiltering: boolean;

}

export class TableFilterConfiguration {
   public static create (def) {
    const config = new TableFilterConfiguration();
    if (def) {
      if (def.hasFiltering !== undefined) {
        config.hasFiltering = def.hasFiltering;
      }
      return config;
    }
  }

  public hasFiltering = true;
}
