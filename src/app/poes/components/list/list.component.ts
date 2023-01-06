import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/poes/services/poe/poe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

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
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.poeService.findAll()
    .subscribe((poes: Poe[])=> {
      this.poes = poes;
    });
  }

  openDialog(): void {
    this.dialog.open(DialogAnimationsExampleDialog);
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
          `la POE ${poe.title} a été supprimé`,
          'Compris', //le nom à cliquer pour fermer la notification d'alerte
          {
            duration: 2500
          }
        )
      })
  }
  
}

@Component({
  selector: 'app-list-poe',
  templateUrl: 'list.component.dialog.html',
})
export class DialogAnimationsExampleDialog {

  public poes:Poe[]=[];

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    private poeService: PoeService,
    private snackBar: MatSnackBar) {}

  public onDelete(poe: Poe):void{
    this.poeService.delete(poe)
      .subscribe((response : HttpResponse<any>)=>{
        //supprimer la ligne dans this.stagiaires
        this.poes.splice(
          this.poes.findIndex((obj: Poe) => obj.id === poe.id),
          1
        );
        this.snackBar.open(
          `la POE ${poe.title} a été supprimé`,
          'Compris', //le nom à cliquer pour fermer la notification d'alerte
          {
            duration: 2500
          }
        )
      })
  }
}

