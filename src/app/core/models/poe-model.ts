export class PoeModel{
    private _id: number =0;
    private _title: string = '';
    private _poeType: string ='';
    private _beginDate?: Date | undefined;
    private _endDate?: Date | undefined ;

    get id(){
        return this._id
    }
    set id(val : number){
        this._id=val
    }

    get title(){
        return this._title
    }
    set title(val : string){
        this._title=val
    }

    get beginDate() : Date | undefined{
        return this._beginDate
    }

    set beginDate(val: Date | undefined) {
        this._beginDate=val
    }

    get endDate() : Date | undefined{
        return this._endDate
    }

    set endDate(val: Date | undefined) {
        this._endDate=val
    }

    get poeType(){
        return this._poeType
    }
    set poeType(val: string) {
        this._poeType=val
    }

}