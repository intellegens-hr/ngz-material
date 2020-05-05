// [ngzGridInjectedContentDef] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input, ContentChild, TemplateRef } from '@angular/core';

/**
 * When child of [ngzGridInjectedContentDef] provides template for injected content
 *
 * Usage:
 *
 * <ng-container *ngzGridInjectedTemplate>
 *  Injected content
 * </ng-container>
 */
@Directive({
  selector: '[ngzGridInjectedTemplate]'
})
export class GridInjectedContentTemplateDirective {}

/**
 * When child of <ngz-grid /> provides a way to inject content just below the header or just above the footer
 *
 * Usage:
 *
 * <ng-container ngzGridInjectedContentDef
 *               [position]="'top'|'bottom'">
 * </ng-container>
 *
 */
@Directive({
  selector: '[ngzGridInjectedContentDef]'
})
export class GridInjectedContentDefDirective {

  /**
   * Position to inject into (allowed: 'top' or 'bottom')
   */
  @Input()
  public position: 'top'|'bottom';

  /**
   * Content child element implementing a *ngzGridInjectedTemplate directive
   * providing injected content template
   */
  @ContentChild(GridInjectedContentTemplateDirective, { read: TemplateRef })
  public template: TemplateRef<any>;

}

/**
 * Grid injected content configuration
 */
export class GridInjectedContentConfiguration {

  /**
   * Creates a injected content configurations instances
   * @param def (Optional) Instance of [ngzGridInjectedContentDef] directive to pull configuration from
   * @returns Injected content configurations instances
   */
  public static create (defs: GridInjectedContentDefDirective[]) {

    // Create a injected content configurations instances from directives
    return (defs || []).map((def) => {

      // Ready a injected content  configurations
      const config = new GridInjectedContentConfiguration();

      // Pull configuration from instance of [ngzGridInjectedContentDef] directive
      if (def.position !== undefined) { config.position = def.position; }
      if (def.template !== undefined) { config.template = def.template; }

      // Set column configuration
      return config;

    });

  }

  /**
   * Position to inject into (allowed: 'top' or 'bottom')
   */
  public position: 'top'|'bottom';
  /**
   * Injected content template
   */
  public template: TemplateRef<any> = null;

}
