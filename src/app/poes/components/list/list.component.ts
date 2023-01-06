import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/poes/services/poe/poe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-poe',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public poes:Poe[]=[];
  constructor(
   /* private router: Router, // DI => Dependency Injection
    private PoesService: PoesService,
    private snackBar: MatSnackBar*/
    private poeService: PoeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.poeService.findAll()
    .subscribe((poes: Poe[])=> {
      this.poes = poes;
    });
  }

  public onDelete(poe: Poe):void{
    this.poeService.delete(poe)
      .subscribe((response : HttpResponse<any>)=>{
        //supprimer la ligne dans this.stagiaires
        this.poes.splice(
          this.poes.findIndex((obj: Poe) => obj.id === poe.id),
          1
        );
        this.snackBar.open(
          `le stagiaire ${poe.id} a été supprimé`,
          'Compris', //le nom à cliquer pour fermer la notification d'alerte
          {
            duration: 2500
          }
        )
      })
  }
  public update(poe:Poe):void{
    console.log(`Got ${poe.id} from list and ready to update`);
    this.router.navigate(['/poes/update', poe.id]);
  }

}
