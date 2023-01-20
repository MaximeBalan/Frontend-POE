import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyModel } from 'src/app/core/models/survey-model';
import { SurveyService } from 'src/app/core/services/survey-service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public survey: SurveyModel |null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SurveyService
  ) { }

  ngOnInit(): void {
     //pour récupérer des détails/données d'une autre page
     this.route.paramMap.subscribe(
      (routeParams) => {
        console.log(`Detail got from survey ${routeParams.get('id')}`); //id est le même nom que dans le path de detail
        try {
          this.service.findOne(+routeParams.get('id')!)
            .subscribe((survey: SurveyModel)=> {
              this.survey = survey;
            })
          console.log(JSON.stringify(this.survey));
        } catch (error) {
          this.router.navigate(['/', 'home']);

        }
      }
    )
    console.log('got detail of one survey');
  }
}
