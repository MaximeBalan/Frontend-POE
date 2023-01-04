export class Poe{
    private _id?: number ;
    private _title: string = '';
    private _poeType: any;
    private _beginDate!: Date | undefined;
    private _endDate!: Date | undefined ;

    get id(): number | undefined {
      return this._id
    }
    
    set id(val: number | undefined) {
      this._id = val
    }
    
    get title() {
      return this._title
    }
    
    set title(val: string) {
      this._title = val
    }
    
    get poeType() {
      return this._poeType
    }
    
    set poeType(val: any) {
      this._poeType = val
    }
    
    get beginDate() {
      return this._beginDate
    }
    
    set beginDate(val: Date | undefined) {
      this._beginDate = val
    }
    
    get endDate() {
      return this._endDate
    }
    
    set endDate(val: Date | undefined) {
      this._endDate = val
    }
    
}