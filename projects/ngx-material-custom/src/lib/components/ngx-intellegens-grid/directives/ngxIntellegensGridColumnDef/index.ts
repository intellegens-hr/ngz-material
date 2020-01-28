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
  public static create (def) {
    const configHash = {};
    if (def) {
      def.forEach(element => {
        const config = new TableColumnConfiguration();
        config.key = element.key;
        config.header = element.header;
        config.footer = element.footer;
        config.sortable = element.sortable;
        configHash[element.key] = config;
      });
    }
    return configHash;
  }
  public key: string;
  public header: string;
  public footer: string;
  public sortable: boolean;
}
