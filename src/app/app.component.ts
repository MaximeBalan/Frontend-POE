import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StagiaireModel } from './core/models/stagiaire-model';
import { StagiaireService } from './core/services/stagiaire-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //view
  styleUrls: ['./app.component.scss'] // Tableau de SCSS pour la mise en forme
})
export class AppComponent {
  public title = 'front-end';

  public stagiaires:StagiaireModel[] = [];

  public showLi: string = 'M';

  public constructor() {
    const service:StagiaireService = new StagiaireService();
    service.deserialize();
    this.stagiaires = service.getStagiaires();
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

}
