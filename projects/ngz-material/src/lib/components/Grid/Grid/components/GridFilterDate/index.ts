// <ngz-grid-filter-date /> filter component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridFilterDate } from '../../models';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { GridFilterBaseComponent } from '../GridFilterBase';

/**
 * Enum with possible date search modes
 */
export enum GridFilterDateModes {
  GREATER_THAN_OR_EQUAL = 'gteq',
  LOWER_THAN_OR_EQUAL = 'lteq',
  RANGE = 'between',
  EQUAL_TO = 'eq'
}

/**
 * Grid filter date component adds datepicker as filter in ngzGrid column filter.
 * Single date and date range is supported with live mode change via dropdown
 */
@Component({
  selector:    'ngz-grid-filter-date',
  templateUrl: './index.html',
  styleUrls:   ['./style.scss']
})
export class GridFilterDateComponent extends GridFilterBaseComponent implements OnChanges {

  /**
   * Date search mode
   */
  @Input()
  public mode = GridFilterDateModes.RANGE;
  /**
   * Title - datepicker single
   */
  @Input()
  public datepickerSingleLabel = 'Date';
  /**
   * Title - datepicker range
   */
  @Input()
  public datepickerRangeLabel = '';
  /**
   * Title - datepicker range from
   */
  @Input()
  public datepickerRangeFromLabel = 'From';
  /**
   * Title - datepicker range to
   */
  @Input()
  public datepickerRangeToLabel = 'To';
  /**
   * Selected date from
   */
  private _dateFrom: Date = undefined;
  /**
   * Selected date to
   */
  private _dateTo: Date = undefined;

  constructor () {
    super();
  }

  // in case components mode is changed via parent component, handle mode change
  public ngOnChanges (changes: SimpleChanges) {
    if (changes.mode){
      const modeChange = changes.mode;
      this._processModeChange(modeChange.previousValue, modeChange.currentValue);
    }
  }

  // if search mode was changed via UI, set new mode and handle changes
  public _handleUiModeChange (newMode: GridFilterDateModes){
    const oldMode = this.mode;
    this.mode = newMode;
    this._processModeChange(oldMode, newMode);
  }

  // when search mode is changed, check if currently set date can be used for new search
  private _processModeChange (previousMode: GridFilterDateModes, newMode: GridFilterDateModes){
    if (previousMode === newMode){
      return;
    }

    // In case range is changed, values must be reset
    if (previousMode === GridFilterDateModes.RANGE || newMode === GridFilterDateModes.RANGE){
      this._dateFrom = null;
      this._dateTo = null;
    }

    const date = this._dateFrom || this._dateTo;
    if (date){
      this._processDateChanged(date);
    }
  }

  /**
   * Based on endOfTheDay parameter, constructs date object at start of the day
   * or end of the day
   * @param date date to parse
   * @param endOfTheDay should time of the day be set to end of the day
   */
  private _processDatePickerDate (date: Date, endOfTheDay?: boolean){
    if (!date){
      return null;
    }

    const returnDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    if (endOfTheDay){
      returnDate.setUTCHours(23, 59, 59, 999);
    }
    return returnDate;
  }
  /**
   * Process filter date change and trigger filter event
   * @param date date to set
   */
  private _processDateChanged (date: Date){
    // reset date range
    this._dateFrom = null;
    this._dateTo = null;

    const isGtEqMode = this.mode === GridFilterDateModes.GREATER_THAN_OR_EQUAL;
    const isLtEqMode = this.mode === GridFilterDateModes.LOWER_THAN_OR_EQUAL;
    const isEqMode = this.mode === GridFilterDateModes.EQUAL_TO;

    // in case this is equal to or greater than - dateFrom must be set
    if (isEqMode || isGtEqMode){
      this._dateFrom = this._processDatePickerDate(date, false);
    }
    // in case this is equal to or greater than - date to must be set
    if (isEqMode || isLtEqMode){
      this._dateTo = this._processDatePickerDate(date, true);
    }

    this._triggerFilterEvent();
  }

  /**
   * Construct UTC date using local date day/month/year
   * @param date date used
   */
  private _toUtcDate (date: Date){
    if (!date){
      return null;
    }
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  /**
   * Event handler for single datepicker input chage, constructs new ISO date from datepicker change event.
   * @param $event Material Datepicker change event
   */
  public _dateChanged ($event: MatDatepickerInputEvent<Date>) {
    const utcDate = this._toUtcDate($event.value);
    this._processDateChanged(utcDate);
  }

  /**
   * Event handler for FROM input of range datepicker
   * @param $event Material Datepicker change event
   */
  public _dateFromChanged ($event: MatDatepickerInputEvent<Date>) {
    const utcDate = this._toUtcDate($event.value);
    this._dateFrom = this._processDatePickerDate(utcDate);
    this._triggerFilterEvent();
  }

  /**
   * Event handler for TO input of range datepicker
   * @param $event Material Datepicker change event
   */
  public _dateToChanged ($event: MatDatepickerInputEvent<Date>) {
    const utcDate = this._toUtcDate($event.value);
    this._dateTo = this._processDatePickerDate(utcDate, true);
    this._triggerFilterEvent();
  }

  /**
   * Build filter object and fire grid filter event
   * @param $event select element event
   */
  private _triggerFilterEvent () {
    // build filter object
    const filter = new GridFilterDate();

    // convert dates to ISO string
    filter.valueFrom = this._dateFrom?.toISOString();
    filter.valueTo = this._dateTo?.toISOString();

    // apply filter to each key specified
    this._applyFilterToKeys(filter);
  }
}
