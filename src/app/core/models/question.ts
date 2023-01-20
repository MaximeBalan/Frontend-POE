
export class Question{
    private _id!: number ;
    private _title: string = '';
    private _questionType: any;
    //private _choices!: Set<Choice>;


    get id(): number {
      return this._id
    }
    
    set id(val: number) {
      this._id = val
    }
    
    get title() {
      return this._title
    }
    
    set title(val: string) {
      this._title = val
    }
    
    get questionType() {
      return this._questionType
    }
    
    set questionType(val: any) {
      this._questionType = val
    }
    
}