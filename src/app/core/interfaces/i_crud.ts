import { Observable } from "rxjs";


export interface Icrud<T>{
   /**
    * findAll()
    * @returns An Observable of an array of T
    * T is a generic, must be defined in services
    * that implements this 
    */ 
   findAll(): Observable<T[]>;
   /**
    * findOne()
    * @param id id of the T object i want to observe
    * @returns Observable of a T object
    */
   findOne(id: number): Observable<T>;
   /**
    * 
    * @param datas datas representing a T object
    * @returns T object after creation
    */
   create(datas : any): Observable<T>;
   /**
    * update(datas: any) Update an Object in the database
    * @param datas Datas representing Object to update in the database
    */
   update(datas: T ): void;
   /**
    * 
    * @param datas datas representing Object to delete in the database
    */
   delete(datas: T):void;
}