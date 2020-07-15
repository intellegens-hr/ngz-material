// <ngz-grid-actions /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, AfterViewInit, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';

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
   * Event triggered when "view" action is triggered
   */
  @Output()
  public view = new EventEmitter<any>();
  /**
   * Event triggered when "edit" action is triggered
   */
  @Output()
  public edit = new EventEmitter<any>();
  /**
   * Event triggered when "delete" action is triggered
   */
  @Output()
  public delete = new EventEmitter<any>();

  constructor (private _customize: GridColumnDefCustomizationProvider) {}

  public ngAfterViewInit () {
    // Configure parent column if found
    if (!this._customize.tag.GridActionsComponent) {
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
