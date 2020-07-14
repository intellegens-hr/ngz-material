import { GridFilterBase } from '../GridFilterBase';
import { EnTTManagerService } from '../../../../../services';

/**
 * This filter type represents scenarios where range may be specified
 * it can be used as:
 * - greater than or equal to (leave valueTo empty)
 * - less than or equal to (leave valueFrom empty)
 * - range
 */
export class GridFilterRange extends GridFilterBase{

  protected static _enttManager = new EnTTManagerService();
  /**
   * Values to match
   */
  public valueFrom?: string | number = undefined;
  public valueTo?: string | number = undefined;

  constructor (){
    super();
    this.name = 'GridFilterRange';
  }

  /**
   * Base method override, check base class for more details
   */
  public get isEmpty (): boolean{
    return !this.valueFrom && !this.valueTo;
  }

  /**
   * Base method override, check base class for more details
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

    // for each key, test if it matches at least one provided value
    return !!(keys as []).find(key => {
      const valueToCheck = GridFilterRange._enttManager.getByPath(item, key);

      // check if value to check is defined and within date range specified
      return !valueToCheck
        || ((!!this.valueFrom ? (valueToCheck >= this.valueFrom) : true)
             && (!!this.valueTo ? (valueToCheck <= this.valueTo) : true));
    });
  }
}
