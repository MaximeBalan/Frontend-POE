import { Question } from "./question";


export class SurveyModel{
  private _id!: number ;
  private _title: string = '';
  private _questions!: Question;


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

  get questions(){
    return this._questions
  }

  set questions(val: Question) {
    this._questions = val
  }
}
