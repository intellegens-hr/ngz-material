// <ngz-grid-actions /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

// Import and (re)export child components
import { GridActionComponent } from './components/GridAction';
export { GridActionComponent };

// Import column definition customization provider
import { GridColumnDefCustomizationProvider } from '../../directives/GridColumnDef';

/**
 * Grid Actions component
 *
 * Usage:
 * <ngz-grid-actions>\
 *  TODO: Add a full usage syntax example\
 * </ngz-grid-actions>
 */
@Component({
  selector:    'ngz-grid-actions',
  templateUrl: './index.html',
  styleUrls:   ['./style.scss']
})
export class GridActionsComponent implements AfterViewInit {

  /**
   * Link to URL. If set, clicking view will link to this URL
   */
  @Input()
  public viewHref: string|string[];
  /**
   * Target to open the view URL link into. Only used if "viewHref" property is set.
   */
  @Input()
  public viewTarget: '_self'|'_blank' = '_self';
  /**
   * Event triggered when "view" action is triggered
   */
  @Output()
  public view = new EventEmitter<any>();

  /**
   * Link to URL. If set, clicking edit will link to this URL
   */
  @Input()
  public editHref: string|string[];
  /**
   * Target to open the view URL link into. Only used if "editHref" property is set.
   */
  @Input()
  public editTarget: '_self'|'_blank' = '_self';
  /**
   * Event triggered when "edit" action is triggered
   */
  @Output()
  public edit = new EventEmitter<any>();

  /**
   * Link to URL. If set, clicking delete will link to this URL
   */
  @Input()
  public deleteHref: string|string[];
  /**
   * Target to open the view URL link into. Only used if "deleteHref" property is set.
   */
  @Input()
  public deleteTarget: '_self'|'_blank' = '_self';
  /**
   * Event triggered when "delete" action is triggered
   */
  @Output()
  public delete = new EventEmitter<any>();

  constructor (private _customize: GridColumnDefCustomizationProvider) {}

  public ngAfterViewInit () {
    // Configure parent column if found
    if (this._customize && !this._customize.tag.GridActionsComponent) {
      // Configure parent column
      const config = this._customize.configuration;
      if (config) {
        config.class        = `${config.class !== undefined ? config.class : ''} cdk-column-dynamic-actions`;
        config.header       = (config.header !== undefined ? config.header : 'Actions');
        config.footer       = (config.footer !== undefined ? config.footer : 'Actions');
        config.hasFiltering = (config.hasFiltering !== undefined ? config.hasFiltering : false);
        config.hasOrdering  = (config.hasOrdering !== undefined ? config.hasOrdering : false);
      }
      // Mark as already customized
      this._customize.tag.GridActionsComponent = true;
    }
  }

  /**
   * Triggers "view" event when action is triggered
   */
  public _doViewAction () {
    this.view.emit();
  }
  /**
   * Triggers "edit" event when action is triggered
   */
  public _doEditAction () {
    this.edit.emit();
  }
  /**
   * Triggers "delete" event when action is triggered
   */
  public _doDeleteAction () {
    this.delete.emit();
  }

}
