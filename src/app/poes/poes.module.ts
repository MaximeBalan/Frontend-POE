import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoesRoutingModule } from './poes-routing.module';
import { AddComponent } from './add/add.component';
import { ListPoeComponent } from './list-poe/list-poe.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddComponent,
    ListPoeComponent
  ],
  imports: [
    CommonModule,
    PoesRoutingModule,
    SharedModule
  ]
})
export class PoesModule { }
