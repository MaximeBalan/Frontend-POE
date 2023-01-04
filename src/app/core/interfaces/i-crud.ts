import { Observable } from "rxjs";

export interface ICrud<T> {
    /**
     * findAll()
     * @returns an observable og an array of T
     * T is a generic must be defined in services
     * that implements this interface
     */
    findAll(): Observable <T[]>;

    /**
     * findone id number
     * @param id id of the T object i want to observe
     * @returns observable of t object
     * 
     */

    findOne(id: number): Observable<T>;

    /**
     * create (datas: any) insert a new object ine the database
     * @param datas datas representing a T object
     * @returns T object after creation
     */
    
    create(datas : any): Observable<T>;

    /**
     * update(datas:any) update an object in the database
     * @param datas datas representing object to update in the database
     * @returns void
     */
    update(datas: T): void;

    /**
     * delete(datas: T) remove an object from the database
     * @param datas object i want to delete in the database
     * @returns void
     */
    delete(datas: T): void;


}
