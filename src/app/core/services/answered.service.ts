import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnswersModel } from '../models/answers';

@Injectable({
  providedIn: 'root'
})
export class AnsweredService {
  private static readonly CONTROLLER_PATH: string = `${environment.api}answers`;
  constructor(private httpClient: HttpClient) { }

   //methods: Create, Read
   public findAll():Observable<AnswersModel[]>{
    return this.httpClient.get<any[]>(
        AnsweredService.CONTROLLER_PATH
    )
    .pipe(
        take(1),
        map((httpResponseBody: any[]) => {
            return httpResponseBody.map((anyAnswers: any) => {
                return anyAnswers//this.deserializeFromJson(anyAnswers)
            })
        })
    )
}

public findOne(id: number): Observable<AnswersModel> {
  return this.httpClient.get<any>(
      `${AnsweredService.CONTROLLER_PATH}/${id}`
  )
  .pipe(
      take(1),
      map((anyAnswer: any) => {
              return anyAnswer;//this.deserializeFromJson(anyAnswer);
          })
  )

}

public create(datas: AnswersModel): Observable<AnswersModel> {
  // console.log(Values received by service : ${JSON.stringify(datas)});
  console.log("Values received by service:", datas);

  // POST the stagiaire completed
  return this.httpClient.post<AnswersModel>(
    AnsweredService.CONTROLLER_PATH,
      //this.serializeJson(datas)
      datas
  )
  .pipe(
      take(1), // Récupère l'objet qui vient de l'API
      map((anyAnswer: any) => { // Transforme le any en ChoiceModel
          return anyAnswer;//this.deserializeFromJson(anyAnswer);
      })
  )
}

}
