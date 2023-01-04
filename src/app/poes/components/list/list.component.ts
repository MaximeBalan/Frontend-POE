import { Component, OnInit } from '@angular/core';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/poes/services/poe/poe.service';

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
  ) {}


  ngOnInit(): void {
    this.poeService.findAll()
    .subscribe((poes: Poe[])=> {
      this.poes = poes;
    }); 
  }

}
