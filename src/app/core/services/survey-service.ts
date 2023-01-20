import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../../../environments/environment";
import { map, take } from 'rxjs/operators';
import { SurveyModel } from "../models/survey-model";




//@Injectable la classe devient un service, injectable dans tous les constructors
@Injectable({
    //dispo à partir de la racine du projet
    providedIn: 'root'
})
export class SurveyService {

    //pour switcher entre fakeApi et api
    private static readonly CONTROLLER_PATH: string = `${environment.api}surveys`;
    //private static readonly CONTROLLER_PATH: string = `${environment.fakeApi}stagiaires`;
    //private traineesOfPoe:[]=[];
    public constructor(
        private httpClient: HttpClient
    ){  }

    //CRUD methods: Create, Read, Update, Delete
    public findAll():Observable<SurveyModel[]>{
        return this.httpClient.get<any[]>(
            SurveyService.CONTROLLER_PATH
        )
        .pipe(
            take(1),
            map((httpResponseBody: any[]) => {
                return httpResponseBody.map((anySurvey: any) => {
                    return this.deserializeFromJson(anySurvey)
                })
            })
        )
    }


    public findOne(id: number): Observable<SurveyModel> {
        return this.httpClient.get<any>(
            `${SurveyService.CONTROLLER_PATH}/${id}`
        )
        .pipe(
            take(1),
            map((anySurvey: any) => {
                    return this.deserializeFromJson(anySurvey);
                })
        )

    }

    public create(datas: any): Observable<SurveyModel> {
        console.log("Values received by service:", datas);
        return this.httpClient.post<SurveyModel>(
            SurveyService.CONTROLLER_PATH,
            this.serializeJson(datas)
        )
        .pipe(
            take(1),
            map((anySurvey: any) => {
                return this.deserializeFromForm(anySurvey);
            })
        )
    }

    public update(data:SurveyModel): Observable<SurveyModel>{
      console.log("Values received by service:", data.id);
      return this.httpClient.put<SurveyModel>(
        `${SurveyService.CONTROLLER_PATH}/${data.id}`,
        this.serializeJson(data)
        )
        .pipe(
            take(1),
            map((anySurvey: any) => {
                return this.deserializeFromForm(anySurvey);
            })
        )

    }

    public delete(datas:SurveyModel):Observable<HttpResponse<any>>{
        return this.httpClient.delete<any>(
            `${SurveyService.CONTROLLER_PATH}/${datas.id}`,
            {
                observe:'response' // HttpResponse {status:200etqq pour ok, redirection: 300etqq, client error: 400etqq}
            }
        )
    }
//du back vers le front
    public deserializeFromJson(anySurvey: any): SurveyModel {
        const survey: SurveyModel = new SurveyModel();
        survey.id = anySurvey.id;
        survey.title = anySurvey.title;
        survey.questions = anySurvey.questions
        return survey;
    }
//du front vers le back
    public serializeJson(anySurvey: any): any {
        const survey: any = {
            id : anySurvey.id,
            title : anySurvey.title,
        }
        console.log("survey à envoyer au back: ", survey)
        return survey;
    }
//du formulaire au service
    public deserializeFromForm(anySurvey: any): SurveyModel {
        const survey: SurveyModel = new SurveyModel();
        survey.id = anySurvey.id;
        survey.title = anySurvey.title;
        survey.questions = anySurvey.questions
        return survey;
    }
}

