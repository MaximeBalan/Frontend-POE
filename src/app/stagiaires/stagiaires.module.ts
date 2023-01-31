import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagiairesRoutingModule } from './stagiaires-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../shared/shared.module';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    AddComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    StagiairesRoutingModule,
    SharedModule,
    MatTableModule
  ]
})
export class StagiairesModule { }
