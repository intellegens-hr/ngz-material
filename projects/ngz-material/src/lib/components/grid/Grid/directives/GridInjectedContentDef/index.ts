// [ngzGridInjectedContentDef] directive
// ----------------------------------------------------------------------------

// Import dependencies
import { Directive, Input, ContentChild, TemplateRef } from '@angular/core';

/**
 * When child of [ngzGridInjectedContentDef] provides template for injected content
 *
 * Usage:
 *
 * <ng-container *ngzGridInjectedContentTemplate>
 *  Injected content
 * </ng-container>
 */
@Directive({
  selector: '[ngzGridInjectedContentTemplate]'
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
   * CSS class for the injected content container
   */
  @Input()
  public class = '';

  /**
   * Position to inject into (allowed: 'above' or 'top' or 'bottom' or 'below')
   */
  @Input()
  public position: 'above'|'top'|'bottom'|'below';

  /**
   * Content child element implementing a *ngzGridInjectedContentTemplate directive
   * providing injected content template
   */
  @ContentChild(GridInjectedContentTemplateDirective, { read: TemplateRef, static: true })
  public template: TemplateRef<any>;

}

/**
 * Grid injected content configuration
 */
export class GridInjectedContentConfiguration {

  /**
   * Creates a injected content configurations instances
   * @param defs (Optional) Instances of [ngzGridInjectedContentDef] directives to pull configuration from
   * @returns Injected content configurations instances
   */
  public static create (defs: GridInjectedContentDefDirective[]) {

    // Create a injected content configurations instances from directives
    return (defs || []).map(GridInjectedContentConfiguration.createSingle);

  }

  /**
   * Creates a injected content configurations instance
   * @param def (Optional) Instance of [ngzGridInjectedContentDef] directive to pull configuration from
   * @returns Injected content configurations instance
   */
  private static createSingle (def: GridInjectedContentDefDirective) {
    // Ready a injected content  configurations
    const config = new GridInjectedContentConfiguration();

    // Pull configuration from instance of [ngzGridInjectedContentDef] directive
    if (def.class !== undefined) { config.class = def.class; }
    if (def.position !== undefined) { config.position = def.position; }
    if (def.template !== undefined) { config.template = def.template; }

    // Set column configuration
    return config;
  }

  /**
   * CSS class for the injected content container
   */
  public class = '';

  /**
   * Position to inject into (allowed: 'above' or 'top' or 'bottom' or 'below')
   */
  public position: 'above'|'top'|'bottom'|'below';

  /**
   * Injected content template
   */
  public template: TemplateRef<any> = null;

}
