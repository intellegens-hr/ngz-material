// <ngz-grid-filter-select /> filter component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, Input } from '@angular/core';
import { GridFilterSimple } from '../../models';
import { MatSelectChange } from '@angular/material/select';
import { GridFilterBaseComponent } from '../GridFilterBase';

/**
 * Grid filter select component adds select element to filter header
 */
@Component({
  selector:    'ngz-grid-filter-select',
  templateUrl: './index.html',
  styleUrls:   ['./style.scss']
})
export class GridFilterSelectComponent extends GridFilterBaseComponent {

  /**
   * Datasource used to build select options
   */
  @Input()
  public dataSource: any[] = [];
  /**
   * Property bound to option text
   */
  @Input()
  public dataSourceTextKey = 'text';
  /**
   * Property bound to option value, text is used if not defined
   */
  @Input()
  public dataSourceValueKey: string = undefined;
  /**
   * Should select be rendered as multiple select
   */
  @Input()
  public multiple = false;
  /**
   * Selected value
   */
  @Input()
  public selectedValue: string | string[];

  constructor () {
    super();
  }

  /**
   * Handle select change event to apply filter
   * @param $event select element event
   */
  public _selectChanged ($event: MatSelectChange) {
    const filterValue = $event.value;

    // build filter object
    const filter = new GridFilterSimple();
    filter.exactMatch = true;
    filter.values = Array.isArray(filterValue) ? filterValue : [ filterValue ];

    // for apply filter to each key specified
    this._applyFilterToKeys(filter);
  }
}
