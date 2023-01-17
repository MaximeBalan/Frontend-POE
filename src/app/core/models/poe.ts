import { StagiaireModel } from "./stagiaire-model";

export class Poe{
    private _id!: number ;
    private _title: string = '';
    private _poeType: any;
    private _beginDate!: Date ;
    private _endDate!: Date ;
    private _stagiaires!: StagiaireModel;

    get stagiaires(){
      return this._stagiaires
    }
    
    set stagiaires(val: StagiaireModel) {
      this._stagiaires = val
    }


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
    
    get poeType() {
      return this._poeType
    }
    
    set poeType(val: any) {
      this._poeType = val
    }
    
    get beginDate() {
      return this._beginDate
    }
    
    set beginDate(val: Date ) {
      this._beginDate = val
    }
    
    get endDate() {
      return this._endDate
    }
    
    set endDate(val: Date ) {
      this._endDate = val
    }
    
}