import { ChoiceModel } from "./choice";

export class QuestionModel{
    private _id!: number ;
    private _title: string = '';
    private _questionType: any;
    private _choices!: ChoiceModel[];

    get id() {
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

    get choices() {
      return this._choices
    }
    
    set choices(val: ChoiceModel[]) {
      this._choices = val
    }


}
