import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StagiairesRoutingModule } from './stagiaires-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { InitialsPipe } from './pipes/initials.pipe';
import { SharedModule } from '../shared/shared.module';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    InitialsPipe,
    AddComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    StagiairesRoutingModule,
    SharedModule
  ]
})
export class StagiairesModule { }
