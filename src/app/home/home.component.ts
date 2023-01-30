import { Component, OnInit } from '@angular/core';
import { Poe } from '../core/models/poe';
import { ActivatedRoute, Router } from '@angular/router';
import { PoeService } from '../poes/services/poe/poe.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public poes:Poe[] = [];
  public info_date: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PoeService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.service.findAll()
      .subscribe((poes: Poe[])=> {
        this.poes = poes;
        console.log(poes);
      });

    this.httpClient.get('http://worldtimeapi.org/api/timezone/Europe/Paris').subscribe((response) => this.info_date = response);
  }

  public goToDetail(id:number):void{
    this.router.navigate(['/detailPoe', id]);
  }

  public getmonth(endDate: Date):any{
    var today = moment([this.info_date.datetime]).format('DD/MM/YYYY');
    var result = moment(today).diff(endDate, 'months');
    return result;
    }

   public sendEmail (idP:number, idS:number):void{
    this.service.sendEmail(idP,idS).subscribe((() => window.location.reload()));
   } 
}
