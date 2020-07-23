// <ngz-grid-actions /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Input, Component } from '@angular/core';
import { GridFilterBase } from '../../models';

@Component({ template: '' })
/**
 * Base class for all filter components
 */
export class GridFilterBaseComponent {

  /**
   * Specify filter key - which column(s) should filter be applied to
   */
  @Input()
  public filterKey: string | string[];
  /**
   * Grid filter callback, must be specified
   */
  @Input()
  public filterChangeCallback: (key: string, filter: GridFilterBase) => void;
  constructor () {}

  /**
   * Apply given filter to keys specified in filterKey input
   * @param $filter Filter to apply
   */
  protected _applyFilterToKeys (filter: GridFilterBase) {
    // apply filter to each key specified
    const filterKeysToApply = Array.isArray(this.filterKey) ? this.filterKey : [ this.filterKey ];
    filterKeysToApply.forEach(key => this.filterChangeCallback(key, filter));
  }
}
