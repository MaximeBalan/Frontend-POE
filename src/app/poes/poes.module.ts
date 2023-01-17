import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoesRoutingModule } from './poes-routing.module';
import { AddComponent } from './components/add/add.component';
import { DialogAnimationsExampleDialog, ListComponent } from './components/list/list.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateComponent } from './components/update/update.component';
import { PoedetailComponent } from './components/poedetail/poedetail.component';
import { InitialsPipe } from '../stagiaires/pipes/initials.pipe';



@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    UpdateComponent,
    DialogAnimationsExampleDialog,
    PoedetailComponent
  ],
  imports: [
    CommonModule,
    PoesRoutingModule,
    SharedModule
  ]
})
export class PoesModule { }
