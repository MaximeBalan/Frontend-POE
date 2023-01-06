import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoesRoutingModule } from './poes-routing.module';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '../shared/shared.module';
import { ManageComponent } from './components/manage/manage.component';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    PoesRoutingModule,
    SharedModule
  ]
})
export class PoesModule { }
