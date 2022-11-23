import { Component, OnInit } from '@angular/core';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public stagiaires:StagiaireModel[] = [];

  public showLi: string = 'M';

  constructor() { 
    const service:StagiaireService = new StagiaireService();
    service.deserialize();
    this.stagiaires = service.getStagiaires();
  }



  ngOnInit(): void {

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

  public goToDetail():void{
    console.log('Go to detail works')
  }

}
