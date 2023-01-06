import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DialogAnimationsExampleDialog } from './components/list/list.component.dialog';
import { PoesRoutingModule } from './poes-routing.module';
import { AddComponent } from './components/add/add.component';
import { DialogAnimationsExampleDialog, ListComponent } from './components/list/list.component';
import { SharedModule } from '../shared/shared.module';
import { ManageComponent } from './components/manage/manage.component';



@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    ManageComponent,
    DialogAnimationsExampleDialog
  ],
  imports: [
    CommonModule,
    PoesRoutingModule,
    SharedModule
  ]
})
export class PoesModule { }
