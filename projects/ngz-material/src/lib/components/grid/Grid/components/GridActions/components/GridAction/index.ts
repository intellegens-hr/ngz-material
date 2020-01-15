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
   * Event triggered when action is triggered
   */
  @Output()
  public activated = new EventEmitter<any>();

  constructor () {}

  /**
   * Triggers event when action is triggered
   */
  public _doAction () {
    this.activated.emit();
  }

}
