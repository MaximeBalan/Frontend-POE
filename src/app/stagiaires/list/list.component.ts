import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public stagiaires:StagiaireModel[] = [];
  public showLi: string = 'A';

  displayedColumns: string[] = [
    //'initial',
    'lastName',
    'firstName',
    'gender',
    'birthDate',
    'poe',
    'actions'
  ];

  dataSource: MatTableDataSource<StagiaireModel> = new MatTableDataSource();
  @ViewChild (MatSort) sort!: MatSort;



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
        this.refreshDataSource();
      });
  }


  refreshDataSource() {
    this.dataSource = new MatTableDataSource(this.stagiaires);
      // filter: default predicate search on all columns (case insensitive)
      this.dataSource.filterPredicate = (data: StagiaireModel, filter: string) => {
          return (data.firstName.toLowerCase().indexOf(filter) >= 0 || data.lastName.toLowerCase().indexOf(filter) >= 0);
      };
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: any){
    let filterValue = event.target.value.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
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

  sortData(sort: Sort) {
    const data = this.stagiaires.slice();
    if (!sort.active || sort.direction === '') {
      this.stagiaires = data;
      return;
    }

    this.stagiaires = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
          case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        default:
          return 0;
      }
    });

    this.refreshDataSource();
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);


}
