import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { SurveyModel } from 'src/app/core/models/survey-model';
import { SurveyService } from 'src/app/core/services/survey-service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public surveys:SurveyModel[] = [];


  //injection des dépendances (les services que l'on veut) dans les paramètres du constructeur
  constructor(
    private router: Router, // DI => Dependency Injection
    private surveyService: SurveyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.surveyService.findAll()
      .subscribe((surveys: SurveyModel[])=> {
        this.surveys = surveys;
      });
  }

  public count():number{
    let sum = 0;
    for(let survey of this.surveys){
      sum +=1
    }
    return sum;
  }

  public goToDetail(id:number):void{
    //pour naviguer vers une autre page
    console.log(`Got ${id} from list`);
    this.router.navigate(['/survey/detail', id]);
  }

  public onDelete(survey: SurveyModel):void{
    this.surveyService.delete(survey)
      .subscribe((response : HttpResponse<any>)=>{

        this.surveys.splice(
          this.surveys.findIndex((obj: SurveyModel) => obj.id === survey.id),
          1
        );
        this.snackBar.open(
          `le formulaire ${survey.title} a été supprimé`,
          'Compris',
          {
            duration: 2500
          }
        )
      })
  }

  public update(survey:SurveyModel):void{
    console.log(`Got ${survey.id} from list and ready to update`);
    this.router.navigate(['/surveys/update', survey.id]);
  }

  sortData(sort: Sort) {
    const data = this.surveys.slice();
    if (!sort.active || sort.direction === '') {
      this.surveys = data;
      return;
    }

    this.surveys = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);


}
