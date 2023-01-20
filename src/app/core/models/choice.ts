// import { Question } from "./question"; fichier questionModel.ts

export class ChoiceModel {
    private _id: number = 0;
    private _name: string = '';

    get id() {
      return this._id
    }
    
    set id(val: number) {
      this._id = val
    }
    
    get name() {
      return this._name
    }
    
    set name(val: string) {
      this._name = val
    }
}

