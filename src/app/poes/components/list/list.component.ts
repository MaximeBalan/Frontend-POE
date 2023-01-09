import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/poes/services/poe/poe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-poe',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public poes:Poe[]=[];
  constructor(
    public dialog: MatDialog,
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

  openDialog(poe: Poe): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      data: poe 
    });
  }

  public update(poe:Poe):void{
    console.log(`Got ${poe.id} from list and ready to update`);
    this.router.navigate(['/poes/update', poe.id]);
  }

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

