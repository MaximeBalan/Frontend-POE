import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public stagiaire!:StagiaireModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //pour récupérer des détails/données d'une autre page
    this.route.paramMap.subscribe(
      (routeParams) => {
        console.log(`Detail got ${routeParams.get('id')}`); //id est le même nom que dans le path de detail
        const service: StagiaireService = new StagiaireService();
        service.deserialize();
        this.stagiaire = service.findOne(+ routeParams.get('id')!);
        try {
          this.stagiaire = service.findOne(+routeParams.get('id')!);
          console.log(JSON.stringify(this.stagiaire));
        } catch (error) {
          this.router.navigate(['/', 'stagiaires']);

        }
      }
    )
    console.log('HELLO');
  }

  public goToList():void{
    this.router.navigate(['/stagiaires']);
  }

}
