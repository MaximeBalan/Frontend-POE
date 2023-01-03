import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoesRoutingModule } from './poes-routing.module';
import { AddComponent } from './add/add.component';
import { ListPoeComponent } from './list-poe/list-poe.component';


@NgModule({
  declarations: [
    AddComponent,
    ListPoeComponent
  ],
  imports: [
    CommonModule,
    PoesRoutingModule
  ]
})
export class PoesModule { }
