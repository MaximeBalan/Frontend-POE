import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StagiaireModel } from "../models/stagiaire-model";
import { environment } from "./../../../environments/environment";
import { map, take } from 'rxjs/operators';

//@Injectable la classe devient un service, injectable dans tous les constructors
@Injectable({
    //dispo à partir de la racine du projet
    providedIn: 'root'
})
export class StagiaireService {
    public constructor(
        //service qui permet d'envoyer de la requete http
        private httpClient: HttpClient
    ){  }

    //CRUD methods: Create, Read, Update, Delete
    public findAll():Observable<StagiaireModel[]>{
        return this.httpClient.get<any[]>(
            `${environment.fakeApi}stagiaires`
        )
        .pipe(
            take(1), //prends le 1er résultat et arrête d'observer
            map((httpResponseBody: any[]) => {
                return httpResponseBody.map((anyStagiaire: any) => {
                    return this.deserialize(anyStagiaire)
                }) // transforme un tableau en un autre tableau
            }) //transforme un Observable(ici O<any[]>) en un autre Observable (O<StagiaireModel[]>)
        ) //pipeline
    }

    public findOne(id: number): Observable<StagiaireModel> {
        return this.httpClient.get<any>(
            `${environment.fakeApi}stagiaires/${id}` // http://localhost:3000/stagiaires/2
        )
        .pipe(
            take(1), //récupère l'objet qui vient de l'API
            map((anyStagiaire: any) => { // transforme le any en StagiaireModel
                    return this.deserialize(anyStagiaire); // deserialise pour le transformer en StagiaireModel
                }) 
        )
         
    }

    public create(datas:any):void{}

    public update(datas:any):void{}

    public delete(datas:any):void{}

    public deserialize(anyStagiaire: any): StagiaireModel {
        const stagiaire: StagiaireModel = new StagiaireModel();
        stagiaire.id = anyStagiaire.id;
        stagiaire.lastName = anyStagiaire.lastName;
        stagiaire.firstName = anyStagiaire.firstName;
        stagiaire.birthDate = anyStagiaire.birthDate;
        stagiaire.gender = anyStagiaire.gender;
        stagiaire.phoneNumber = anyStagiaire.phoneNumber;
        stagiaire.email = anyStagiaire.email

        return stagiaire;
    }
}

