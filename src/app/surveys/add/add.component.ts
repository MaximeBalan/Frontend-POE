import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionModel } from 'src/app/core/models/question';
import { QuestionService } from 'src/app/core/services/question-service';
import { SurveyService } from 'src/app/core/services/survey-service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public questions:QuestionModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.questionService.findAll()
      .subscribe((questions: QuestionModel[])=> {
        this.questions = questions;
      });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }
}
