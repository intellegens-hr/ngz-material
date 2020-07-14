import { GridFilterRange } from '../GridFilterRange';

/**
 * This filter type represents most simple scenario where key (or several keys)
 * need to match specified value(s) - either exact or not.
 */
export class GridFilterDate extends GridFilterRange {

  constructor (){
    super();
  }

  /**
   * Base method override, check base class for more details
   * Date values have specific logic, thus custom emplementation
   */
  public objectMatchedByKeys (keys: string | string[], item: object): boolean{
    if (!keys || !item){
      return true;
    }

    // go from string | string[] to string[]
    if (!Array.isArray(keys)){
      keys = [ keys ];
    }

    // if filter is not specified, return true immediately
    if (this.isEmpty){
      return true;
    }

    const filterDateFrom = this.valueFrom ? new Date(this.valueFrom) : null;
    const filterDateTo = this.valueTo ? new Date(this.valueTo) : null;

    // for each key, test if it matches at least one provided value
    return !!(keys as []).find(key => {
      let valueToCheck = GridFilterDate._enttManager.getByPath(item, key);
      valueToCheck = valueToCheck instanceof Date ? valueToCheck : new Date(valueToCheck);

      // check if value to check is defined and within date range specified
      return !valueToCheck
        || ((!!filterDateFrom ? (valueToCheck >= filterDateFrom) : true)
             && (!!filterDateTo ? (valueToCheck <= filterDateTo) : true));
    });
  }
}
