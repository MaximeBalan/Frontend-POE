import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poe } from 'src/app/core/models/poe';
import { environment } from "./../../../../environments/environment";
import { map, take } from 'rxjs/operators';
import { Icrud } from './../../../core/interfaces/i_crud';


@Injectable({
  providedIn: 'root'
})
export class PoeService implements Icrud<Poe>{

  private static readonly CONTROLLER_PATH: string = `${environment.api}poe`;
  constructor(
    private httpClient: HttpClient,
  ) {}

  findAll(): Observable<Poe[]> {
    return this.httpClient.get<any[]>(
      PoeService.CONTROLLER_PATH
    ).pipe(
      take(1),
    map((dataApiPoe: any[])=>{
      return dataApiPoe.map((dataApiPoe: any) => {
        return this.deserializeFromJson(dataApiPoe)
      })
    }))
  }

  findOne(id: number): Observable<Poe> {
    throw new Error('Method not implemented.');
  }


  create(datas: any): Observable<Poe> {
    return this.httpClient.post<any>(
      PoeService.CONTROLLER_PATH,
      this.serializeJson(datas)).pipe(
        take(1),
        map((anyPoe:any)=>{
            return this.deserializeFromForm(anyPoe)
          
        }))
  }


  update(datas: Poe): void {
    throw new Error('Method not implemented.');
  }
  delete(datas: Poe): void {
    throw new Error('Method not implemented.');
  }


      
  
public deserializeFromJson(anyPoe: any): Poe {
  const poe: Poe = new Poe();
  poe.id = anyPoe.id;
  poe.title = anyPoe.title;
  poe.beginDate = new Date (anyPoe.beginDate);
  poe.endDate = new Date (anyPoe.endDate);
  poe.poeType= anyPoe.poeType;
  return poe;
}

public serializeJson(anyPoe: any): any {
  const poe: any = {
    id : anyPoe.id,
    title : anyPoe.title,
    beginDate : new Date (anyPoe.beginDate),
    endDate : new Date (anyPoe.endDate),
    poeType: anyPoe.poeType,
  }
  console.log("POE à envoyer au back: ", poe)
  return poe;
}

public deserializeFromForm(anyPoe: any): Poe {
  const poe: Poe = new Poe();
  poe.id = anyPoe.id;
  poe.title = anyPoe.title;
  poe.beginDate = new Date (anyPoe.beginDate);
  poe.endDate = new Date (anyPoe.endDate);
  poe.poeType= anyPoe.poeType;
  return poe;
}

}
