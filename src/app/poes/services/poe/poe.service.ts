import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICrud } from 'src/app/core/interfaces/i-crud';
import { Poe } from 'src/app/core/model/poe';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PoeService implements ICrud<Poe>{

  private static readonly CONTROLLER_PATH: string = `${environment.api}poes`;


  constructor(private httpClient: HttpClient) { }
  findAll(): Observable<Poe[]> {
    return this.httpClient.get<any>(
      PoeService.CONTROLLER_PATH
    )
    .pipe(
      take(1),
      map((fromApiPoes: any) => {
        return fromApiPoes.map((fromApiPoes: any) => {
          const poe : Poe= new Poe();
          poe.id= fromApiPoes.id;
          poe.title= fromApiPoes.title;
          poe.beginDate= new Date (fromApiPoes.beginDate);
          poe.endDate= new Date (fromApiPoes.endDate)g;
          poe.poeType= fromApiPoes.poeType;
          return poe;
        })
      })
    )
  }
  findOne(id: number): Observable<Poe> {
    throw new Error('Method not implemented.');
  }
  create(datas: any): Observable<Poe> {
    throw new Error('Method not implemented.');
  }
  update(datas: Poe): void {
    throw new Error('Method not implemented.');
  }
  delete(datas: Poe): void {
    throw new Error('Method not implemented.');
  }
}
