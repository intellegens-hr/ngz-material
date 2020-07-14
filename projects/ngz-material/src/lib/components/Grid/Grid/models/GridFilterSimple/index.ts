import { GridFilterBase } from '../GridFilterBase';
import { EnTTManagerService } from '../../../../../services';

/**
 * This filter type represents most simple scenario where key (or several keys)
 * need to match specified value(s) - either exact or not.
 */
export class GridFilterSimple extends GridFilterBase{

  private static _enttManager = new EnTTManagerService();
  /**
   * Values to match
   */
  public values: any[] = [];
  /**
   * Should provided value be matched exactly or loose. Non-string values are converted to string
   */
  public exactMatch = true;
  /**
   * Does provided (string) value contains wildcard characters or not
   */
  public containsWildcards = false;

  constructor (){
    super();
    this.name = 'GridFilterSimple';
  }

  /**
   * Base method override, check base class for more details
   */
  public get isEmpty (): boolean{
    return !this.values || (this.values.filter(x => x !== '').length === 0);
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
      return !!this.values.find(value => {
        const regexMatch = this.exactMatch ? `^${value}$` : value;
        const regexSwitch = this.exactMatch ? '' : 'i';
        const regex = new RegExp(regexMatch, regexSwitch);

        return regex.test(GridFilterSimple._enttManager.getByPath(item, key));
      })
    })
  }
}
