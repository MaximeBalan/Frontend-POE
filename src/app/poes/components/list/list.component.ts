import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/poes/services/poe/poe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-list-poe',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public poes:Poe[]=[];
  public showLi: string = 'A';
  public poeType: string | null = '';
  // public searchInput : any = document.querySelector("#search");
  // public searchResult : any = document.querySelector(".table-results");

  constructor(
    public dialog: MatDialog,
    private poeService: PoeService, // quand on veut utiliser un service dans un composant il faut l'ajouter comme ça. C'est que les methodes des classes static qu'on importe
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  // combineLatest permet de combiner le resultat de 2 observables pour avoir les deux reponses en meme temps

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.poeService.findAll()]).subscribe(([routeParam, poes]) => {
      if (routeParam.get('type') != null) {
        this.poeType = routeParam.get('type'); // permet de recuperer POEI ou POEC d'apres l'uri et le fichier de routing via "type"
        this.poes = poes.filter((p:Poe)=> p.poeType === this.poeType);
      } else {
        this.poes = poes;
      }
    });
  }



  openDialog(poe: Poe): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      data: poe
    });
  }

  public update(poe:Poe):void{
    console.log(`Got ${poe.id} from list and ready to update`);
    this.router.navigate(['/poes/update', poe.id]);
  }

  // public filterData(e:any):any {

  //   this.searchInput.addEventListener("input", this.filterData)

  //   this.searchResult.innerHTML = ""

  //   const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

  //   const filteredArr = this.poes.filter(el =>
  //     el.title.toLowerCase().includes(searchedString) ||
  //     `${el.title}`.toLowerCase().replace(/\s/g, "").includes(searchedString)
  //     )

  //   return filteredArr
  // }



  sortData(sort: Sort) {
    const data = this.poes.slice();
    if (!sort.active || sort.direction === '') {
      this.poes = data;
      return;
    }

    this.poes = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'poeType':
          return compare(a.poeType, b.poeType, isAsc);
          case 'beginDate':
            return compare(a.beginDate, b.beginDate, isAsc);
            case 'endDate':
              return compare(a.endDate, b.endDate, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



@Component({
  selector: 'app-list-poe',
  templateUrl: 'list.component.dialog.html',
})
export class DialogAnimationsExampleDialog {

  public poes:Poe[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Poe ,public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    private poeService: PoeService,
    private snackBar: MatSnackBar) {}


  public onDelete():void{
    this.poeService.delete(this.data)
      .subscribe((response : HttpResponse<any>)=>{
        //supprimer la ligne dans this.poes
        this.poes.splice(
          this.poes.findIndex((obj: Poe) => obj.id === this.data.id),
          1
        );
        this.snackBar.open(
          `la POE ${this.data.title} a été supprimé`,
          'Compris', //le nom à cliquer pour fermer la notification d'alerte
          {
            duration: 2500
          }
        )
      })
  }



}




