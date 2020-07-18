// <ngz-grid-action /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Grid Action component
 *
 * Usage:
 * <ngz-grid-action
 *   [icon]    ="'google_material_icon_key'"
 *   (selected)="runWhenActionTriggered()">\
 * </ngz-grid-action>
 */
@Component({
  selector:    'ngz-grid-action',
  templateUrl: './index.html',
  styleUrls:   ['./style.scss']
})
export class GridActionComponent {

  /**
   * Google material icon key
   */
  @Input()
  public icon: string;

  /**
   * Label to be displayed inside the action tooltip
   */
  @Input()
  public label: string;

  /**
   * Link to URL. If set, the button will be rendered as an anchor element.
   */
  @Input()
  public href: string|string[];

  /**
   * Target to open the URL link into. Only used if "href" property is set.
   */
  @Input()
  public target: '_self'|'_blank' = '_self';

  /**
   * Event triggered when action is triggered
   */
  @Output()
  public activated = new EventEmitter<any>();

  constructor () {}

  /**
   * Composes a HREF url from potentially array of partial paths
   */
  public _stringifyHref () {
    return (this.href instanceof Array ? this.href.join('/') : this.href);
  }

  /**
   * Triggers event when action is triggered
   */
  public _doAction () {
    this.activated.emit();
  }

}
