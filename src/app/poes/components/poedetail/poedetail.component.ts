import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';
import { PoeService } from '../../services/poe/poe.service';

@Component({
  selector: 'app-poedetail',
  templateUrl: './poedetail.component.html',
  styleUrls: ['./poedetail.component.scss']
})
export class PoedetailComponent implements OnInit {
  public stagiaires:StagiaireModel[] = [];
  public showLi: string = 'A';
  public poeId: any | null=''; 

  //injection des dépendances (les services que l'on veut) dans les paramètres du constructeur
  constructor(
    private router: Router, // DI => Dependency Injection
    private stagiaireService: StagiaireService,
    private poeService: PoeService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

      combineLatest([this.route.paramMap, this.stagiaireService.findAll()]).subscribe(([routeParam, stagiaires]) => {
        if (routeParam.get('id') != null) {
          this.poeId = routeParam.get('id'); // permet de recuperer POEI ou POEC d'apres l'uri et le fichier de routing via "type"
          this.stagiaires = stagiaires.filter((p:StagiaireModel)=> p.poe?.id == this.poeId);
          console.log(this.poeId);
          
        } else {
          this.stagiaires = stagiaires;
        }
      });
  }

  public changeGender(): void {
    if (this.showLi === 'M') {
      this.showLi = 'F';
    } else {
      this.showLi = 'M';
    }
  }
  public count():number{
    let sum = 0;
    for(let stagiaire of this.stagiaires){
      sum +=1
    }
    return sum;
  }

  public displayNumber():number{
    if(this.showLi === 'A'){
      return this.stagiaires.length;
    }
    return this.stagiaires.filter((stagiaire:any) => stagiaire.gender === this.showLi).length;
  }

  public onDelete(stagiaire: StagiaireModel):void{
    this.stagiaireService.delete(stagiaire)
      .subscribe((response : HttpResponse<any>)=>{
        //supprimer la ligne dans this.stagiaires
        this.stagiaires.splice(
          this.stagiaires.findIndex((obj: StagiaireModel) => obj.id === stagiaire.id),
          1
        );
        this.snackBar.open(
          `le stagiaire ${stagiaire.firstName + stagiaire.lastName} a été supprimé`,
          'Compris', //le nom à cliquer pour fermer la notification d'alerte
          {
            duration: 2500
          }
        )
      })
  }

  public update(stagiaire:StagiaireModel):void{
    console.log(`Got ${stagiaire.id} from list and ready to update`);
    this.router.navigate(['/stagiaires/update', stagiaire.id]);
  }

  public sendId(id:number){
    console.log('ID:',id)
    this.router.navigate(['/stagiaire/add', id]);
  }

}

