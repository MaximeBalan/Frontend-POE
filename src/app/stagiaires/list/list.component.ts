import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public stagiaires:StagiaireModel[] = [];

  public showLi: string = 'A';

  //injection des dépendances (les services que l'on veut) dans les paramètres du constructeur
  constructor(
    private router: Router, // DI => Dependency Injection
    private stagiaireService: StagiaireService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.stagiaireService.findAll()
      .subscribe((stagiaires: StagiaireModel[])=> {
        this.stagiaires = stagiaires;
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

  /**
   * let item: number = 0;
   * for (const stagiaire of this.stagiaires){
   *    if(stagiaire.gender === this.showLi) {
   *        item +=1;
   *    } 
   * }
   * return item;
   * 
   */

  public goToDetail(id:number):void{
    //pour naviguer vers une autre page
    console.log(`Got ${id} from list`);
    this.router.navigate(['/detail', id]);
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
          `le stagiaire ${stagiaire.id} a été supprimé`,
          'Compris', //le nom à cliquer pour fermer la notification d'alerte
          {
            duration: 2500
          }
        )
      })
  }

}
