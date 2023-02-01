import {CdkDragDrop,moveItemInArray,transferArrayItem,} from '@angular/cdk/drag-drop';
import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionModel } from 'src/app/core/models/question';
import { SurveyModel } from 'src/app/core/models/survey-model';
import { QuestionService } from 'src/app/core/services/question-service';
import { SurveyService } from 'src/app/core/services/survey-service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  title = 'dropzone';
  public questionAvailable: QuestionModel[] = [];
  public questionSelected: QuestionModel[] = [];
  public surveys: SurveyModel[] = [];
  public titre: string ='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private surveyService: SurveyService
  ) { }
  ngOnInit(): void {
        this.questionService.findAll()
      .subscribe((questions: QuestionModel[])=> {
        this.questionAvailable = questions;
      });
  }
onClick(event: Event) {
  /*
  méthode pour ajouter un survey
  */
 this.surveyService.create( this.titre,this.questionSelected).subscribe(()=>console.log("survey posted"));
}



  drop(event: CdkDragDrop<QuestionModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
