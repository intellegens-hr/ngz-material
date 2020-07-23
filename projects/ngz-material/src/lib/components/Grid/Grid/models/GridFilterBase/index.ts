export class GridFilterBase{
  constructor (){}

  /**
   * Each filter type should have unique name by which other libraries can
   * identify them by. Ideally, this is same as class name
   */
  public name: string;

  /**
   * If filter is not specified, return true.
   * This is useful when filter needs to be removed since no value is selected
   */
  public get isEmpty (): boolean{
    return false;
  }

  /**
   * For given keys, test if object matches current filter configuration
   * @param keys keys to check
   * @param item object to check by filter and given keys
   */
  public objectMatchedByKeys (keys: string[], item: object): boolean{
    return true;
  }
}
