import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoesRoutingModule } from './poes-routing.module';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateComponent } from './components/update/update.component';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    PoesRoutingModule,
    SharedModule
  ]
})
export class PoesModule { }
