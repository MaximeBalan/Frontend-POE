import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChoiceModel } from '../models/choice';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  private static readonly CONTROLLER_PATH: string = `${environment.api}choices`;
  
  public constructor(
    private httpClient: HttpClient
  ) { }

  public findAll():Observable<ChoiceModel[]>{
    return this.httpClient.get<any[]>(
        ChoiceService.CONTROLLER_PATH
    )
    .pipe(
        take(1), //prends le 1er résultat et arrête d'observer
        map((httpResponseBody: any[]) => {
            return httpResponseBody.map((anyChoice: any) => {
                return this.deserializeFromJson(anyChoice)
            }) // transforme un tableau en un autre tableau
        }) //transforme un Observable(ici O<any[]>) en un autre Observable (O<ChoiceModel[]>)
    ) //pipeline
}

public findOne(id: number): Observable<ChoiceModel> {
  return this.httpClient.get<any>(
      `${ChoiceService.CONTROLLER_PATH}/${id}` // http://localhost:3000/choices/2
  )
  .pipe(
      take(1), //récupère l'objet qui vient de l'API
      map((anyChoice: any) => { // transforme le any en ChoiceModel
              return this.deserializeFromJson(anyChoice); // deserialise pour le transformer en ChoiceModel
          })
  )
}

public create(datas: ChoiceModel): Observable<ChoiceModel> {
  // console.log(Values received by service : ${JSON.stringify(datas)});
  console.log("Values received by service:", datas);

  // POST the stagiaire completed
  return this.httpClient.post<ChoiceModel>(
      ChoiceService.CONTROLLER_PATH,
      this.serializeJson(datas)
      //datas
  )
  .pipe(
      take(1), // Récupère l'objet qui vient de l'API
      map((anyChoice: any) => { // Transforme le any en ChoiceModel
          return this.deserializeFromJson(anyChoice);
      })
  )
}

public update(data:ChoiceModel): Observable<ChoiceModel>{
console.log("Values received by service:", data.id);
return this.httpClient.put<ChoiceModel>(
  `${ChoiceService.CONTROLLER_PATH}/${data.id}`,
  this.serializeJson(data)
  )
  .pipe(
      take(1), // Récupère l'objet qui vient de l'API
      map((anyChoice: any) => { // Transforme le any en ChoiceModel
          return this.deserializeFromJson(anyChoice);
      })
  )
}

public delete(datas:ChoiceModel):Observable<HttpResponse<any>>{
  return this.httpClient.delete<any>(
      `${ChoiceService.CONTROLLER_PATH}/${datas.id}`,
      {
          observe:'response' // HttpResponse {status:200etqq pour ok, redirection: 300etqq, client error: 400etqq}
      }
  )
}



public deserializeFromJson(anyChoice: any): ChoiceModel {
        const choice: ChoiceModel = new ChoiceModel();
        choice.id = anyChoice.id;
        choice.name = anyChoice.name;
       // stagiaire.question = anyChoice.question
        return choice;
  }

  public serializeJson(anyChoice: any): any {
    const choice: any = {
        id : anyChoice.id,
        name : anyChoice.name,
    }
    console.log("choice to end to back: ", choice)
    return choice;
}
}
