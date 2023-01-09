import { Component, OnInit } from '@angular/core';
import { Poe } from '../core/models/poe';
import { ActivatedRoute, Router } from '@angular/router';
import { PoeService } from '../poes/services/poe/poe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public poes:Poe[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PoeService
  ) {}

  ngOnInit(): void {
    this.service.findAll()
      .subscribe((poes: Poe[])=> {
        this.poes = poes;
      });
  }

  public goToList():void{
    this.router.navigate(['/poes']);
  }


}
