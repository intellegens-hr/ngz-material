// <ngz-grid-filter-text /> filter component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridFilterSimple } from '../../models';
import { GridFilterBaseComponent } from '../GridFilterBase';

/**
 * Enum with possible string search modes
 */
export enum GridFilterTextModes {
  EXACT = 'exact',
  WILDCARD = 'wildcard',
  CONTAINS = 'contains'
}

/**
 * Grid filter text component adds input text as filter in ngzGrid column filter.
 * Different text search modes are possible (exact, contains, wildcard)
 */
@Component({
  selector:    'ngz-grid-filter-text',
  templateUrl: './index.html',
  styleUrls:   ['./style.scss']
})
export class GridFilterTextComponent extends GridFilterBaseComponent implements OnChanges {

  /**
   * Should select be rendered as multiple select
   */
  @Input()
  public mode = GridFilterTextModes.CONTAINS;
  /**
   * 
   */
  @Input()
  public searchValue: string = '';

  constructor () {
    super();
  }

  // in case components mode is changed via parent component, handle mode change
  public ngOnChanges (changes: SimpleChanges) {
    if (changes.mode){
      this._processFiltering();
    }
  }

  /**
   * When search mode is changed, trigger filtering
   * @param newMode search mode
   */
  public _handleUiModeChange(mode: GridFilterTextModes){
    this.mode = mode;
    this._processFiltering();
  }

  /**
   * Event handler for input chage
   * @param $event Input change event
   */
  public _inputChanged () {
    this._processFiltering();
  }

  /**
   * Build filter object and trigger filtering
   */
  private _processFiltering(){
    const filter = new GridFilterSimple();
    filter.values = [ this.searchValue ];
    filter.exactMatch = this.mode === GridFilterTextModes.EXACT;
    filter.containsWildcards = this.mode === GridFilterTextModes.WILDCARD;
    
    // for apply filter to each key specified
    this._applyFilterToKeys(filter);
  }
}
