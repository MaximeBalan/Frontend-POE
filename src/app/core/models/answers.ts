export class AnswersModel {
    private _id: number = 0;
    private _value: string = '';

    get id() {
      return this._id
    }
    
    set id(val: number) {
      this._id = val
    }

    get value() {
        return this._value
      }
      
      set value(val: string) {
        this._value = val
      }
    
}