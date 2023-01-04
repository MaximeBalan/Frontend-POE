import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoeModel } from '../models/poe-model';
import { environment } from "./../../../environments/environment";
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PoeService {
  private static readonly CONTROLLER_PATH: string = `${environment.api}poe`;
  constructor(
    private httpClient: HttpClient
  ) { }

  public findAll():Observable<PoeModel[]>{
    return this.httpClient.get<any[]>(
      PoeService.CONTROLLER_PATH
  )
  .pipe(
      take(1), //prends le 1er résultat et arrête d'observer
      map((httpResponseBody: any[]) => {
          return httpResponseBody.map((anyPoe: any) => {
              return this.deserializeFromJson(anyPoe)
          }) // transforme un tableau en un autre tableau
      }) //transforme un Observable(ici O<any[]>) en un autre Observable (O<StagiaireModel[]>)
  ) //pipeline
}

public deserializeFromJson(anyPoe: any): PoeModel {
  const poe: PoeModel = new PoeModel();
  poe.id = anyPoe.id;
  poe.title = anyPoe.title;
  poe.beginDate = new Date (anyPoe.beginDate);
  poe.endDate = new Date (anyPoe.endDate);
  poe.poeType= anyPoe.poeType;
  return poe;
}



}
