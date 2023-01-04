import { Component, OnInit } from '@angular/core';
import { PoeModel } from 'src/app/core/models/poe-model';
import { PoeService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-list-poe',
  templateUrl: './list-poe.component.html',
  styleUrls: ['./list-poe.component.scss']
})
export class ListPoeComponent implements OnInit {
  public poes:PoeModel[]=[];
  constructor(
   /* private router: Router, // DI => Dependency Injection
    private PoesService: PoesService,
    private snackBar: MatSnackBar*/
    private poeService: PoeService,
  ) {}


  ngOnInit(): void {
    this.poeService.findAll()
    .subscribe((poes: PoeModel[])=> {
      this.poes = poes;
    }); 
  }

}
