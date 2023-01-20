import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StagiaireModel } from "../models/stagiaire-model";
import { environment } from "./../../../environments/environment";
import { map, take } from 'rxjs/operators';
import { QuestionModel } from "../models/question";




//@Injectable la classe devient un service, injectable dans tous les constructors
@Injectable({
    //dispo à partir de la racine du projet
    providedIn: 'root'
})
export class QuestionService {

    //pour switcher entre fakeApi et api
    private static readonly CONTROLLER_PATH: string = `${environment.api}questions`;
    //private static readonly CONTROLLER_PATH: string = `${environment.fakeApi}stagiaires`;

    public constructor(
        //service qui permet d'envoyer de la requete http
        private httpClient: HttpClient

    ){  }

    //CRUD methods: Create, Read, Update, Delete
    public findAll():Observable<QuestionModel[]>{
        return this.httpClient.get<any[]>(
            QuestionService.CONTROLLER_PATH
        )
        .pipe(
            take(1), //prends le 1er résultat et arrête d'observer
            map((httpResponseBody: any[]) => {
                return httpResponseBody.map((anyQuestion: any) => {
                    return this.deserializeFromJson(anyQuestion)
                }) // transforme un tableau en un autre tableau
            }) //transforme un Observable(ici O<any[]>) en un autre Observable (O<StagiaireModel[]>)
        ) //pipeline
    }


    public findOne(id: number): Observable<QuestionModel> {
        return this.httpClient.get<any>(
            `${QuestionService.CONTROLLER_PATH}/${id}` // http://localhost:3000/questions/2
        )
        .pipe(
            take(1), //récupère l'objet qui vient de l'API
            map((anyQuestions: any) => { // transforme le any en
                    return this.deserializeFromJson(anyQuestions);
                })
        )

    }

    public create(datas: any): Observable<QuestionModel> {
        // console.log(Values received by service : ${JSON.stringify(datas)});
        console.log("Values received by service:", datas);

        // POST the stagiaire completed
        return this.httpClient.post<QuestionModel>(
            QuestionService.CONTROLLER_PATH,
            this.serializeJson(datas)
            //datas
        )
        .pipe(
            take(1), // Récupère l'objet qui vient de l'API
            map((anyQuestion: any) => {
                return this.deserializeFromForm(anyQuestion);
            })
        )
    }

    public update(data:QuestionModel): Observable<QuestionModel>{
      console.log("Values received by service:", data.id);
      return this.httpClient.put<QuestionModel>(
        `${QuestionService.CONTROLLER_PATH}/${data.id}`,
        this.serializeJson(data)
        )
        .pipe(
            take(1), // Récupère l'objet qui vient de l'API
            map((anyQuestion: any) => {
                return this.deserializeFromForm(anyQuestion);
            })
        )

    }

    public delete(datas:QuestionModel):Observable<HttpResponse<any>>{
        return this.httpClient.delete<any>(
            `${QuestionService.CONTROLLER_PATH}/${datas.id}`,
            {
                observe:'response' // HttpResponse {status:200etqq pour ok, redirection: 300etqq, client error: 400etqq}
            }
        )
    }
//du back vers le front
    public deserializeFromJson(anyQuestion: any): QuestionModel {
        const question: QuestionModel = new QuestionModel();
        question.id = anyQuestion.id;
        question.title = anyQuestion.title;
        question.questionType = anyQuestion.questionType;
        return question;
    }
//du front vers le back
    public serializeJson(anyQuestion: any): any {
        const question: any = {
            id : anyQuestion.id,
            title : anyQuestion.title,
            questionType : anyQuestion.questionType
        }
        console.log("question à envoyer au back: ", question)
        return question;
    }
//du formulaire au service
    public deserializeFromForm(anyQuestion: any): QuestionModel {
        const question: QuestionModel = new QuestionModel();
        question.id = anyQuestion.id;
        question.title = anyQuestion.title;
        question.questionType = anyQuestion.questionType;
        return question;
    }


}

