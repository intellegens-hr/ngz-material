// <ngz-grid-filter-number /> filter component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, Input } from '@angular/core';
import { GridFilterSimple, GridFilterBase, GridFilterRange } from '../../models';
import { GridFilterBaseComponent } from '../GridFilterBase';

/**
 * Enum with possible number search modes
 */
export enum GridFilterNumberModes {
  GREATER_THAN_OR_EQUAL = 'gteq',
  LOWER_THAN_OR_EQUAL = 'lteq',
  RANGE = 'between',
  EQUAL_TO = 'eq',
  CONTAINS = 'contains'
}

/**
 * Grid filter number component adds input number as filter in ngzGrid column filter.
 * Single number and range is supported with live mode change via dropdown. Min and max values can be specified
 */
@Component({
  selector:    'ngz-grid-filter-number',
  templateUrl: './index.html',
  styleUrls:   ['./style.scss']
})
export class GridFilterNumberComponent extends GridFilterBaseComponent {

  /**
   * Minimum value
   */
  @Input()
  public min?: number = undefined;
  /**
   * Maximum value
   */
  @Input()
  public max?: number = undefined;
  /**
   * Mode of search
   */
  @Input()
  public mode = GridFilterNumberModes.CONTAINS;

  /**
   * Value from
   */
  @Input()
  public valueFrom: number = undefined;
  /**
   * Value to - makes sense only if mode is set to range
   */
  @Input()
  public valueTo: number = undefined;
  
  constructor () {
    super();
  }

  /**
   * When search mode is changed, trigger filtering
   * @param newMode search mode
   */
  public _handleUiModeChange(newMode){
    this.mode = newMode;
    this._inputChanged();
  }

  /**
   * Event handler for input chage
   * @param $event Input change event
   */
  public _inputChanged () {
    let filter: GridFilterBase;
    if (this.mode === GridFilterNumberModes.EQUAL_TO || this.mode === GridFilterNumberModes.CONTAINS){
      filter = this._buildFilterSimple();
    }
    else {
      filter = this._buildFilterRange();
    }

    // for apply filter to each key specified
    this._applyFilterToKeys(filter);
  }

  /**
   * Build simple filter - used when mode is set to equal or contains
   */
  private _buildFilterSimple (){
    const filter = new GridFilterSimple();
    filter.values = this.valueFrom ? [ this.valueFrom ] : [];
    filter.exactMatch = this.mode === GridFilterNumberModes.EQUAL_TO;
    return filter;
  }

  /**
   * Build range filter - used when mode is set to range, less than/greater than
   */
  private _buildFilterRange (){
    const filter = new GridFilterRange();
    // to avoid clutter 
    const greaterThanMode = this.mode === GridFilterNumberModes.GREATER_THAN_OR_EQUAL;
    const lowerThanMode = this.mode === GridFilterNumberModes.LOWER_THAN_OR_EQUAL;
    const rangeMode = this.mode === GridFilterNumberModes.RANGE;
    // specify range: if GREATER_THAN_OR_EQUAL - dateFrom must be set, if LOWER_THAN_OR_EQUAL - dateTo must be set
    // in case of range - both values must be set
    filter.valueFrom = (rangeMode || greaterThanMode) ? this.valueFrom : null;
    filter.valueTo = lowerThanMode ? this.valueFrom
                    : rangeMode ? this.valueTo
                    : null;
    return filter;
  }
}
