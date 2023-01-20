import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysRoutingModule } from './surveys-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    UpdateComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    SharedModule
  ]
})
export class SurveysModule { }
