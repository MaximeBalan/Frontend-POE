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

    get begin_date() : Date | undefined{
        return this._beginDate
    }

    set begin_date(val: Date | undefined) {
        this._beginDate=val
    }

    get end_date() : Date | undefined{
        return this._endDate
    }

    set end_date(val: Date | undefined) {
        this._endDate=val
    }

    get poe_type(){
        return this._poeType
    }
    set poe_type(val: string) {
        this._poeType=val
    }

}