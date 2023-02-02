import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/helpers/auth.guard';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

import { UpdateComponent } from './update/update.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SurveysRoutingModule {
  public static routes: Routes=[
    {
      path:'',
      redirectTo: 'list',
      canActivate: [AuthGuard],
      pathMatch: 'full'
    },
    {
      path: 'list',
      component: ListComponent,
      canActivate: [AuthGuard]
    },

    {
      path:'add',
      component: AddComponent,
      canActivate: [AuthGuard]
    },

    {
      path:'update/:id',
      component: UpdateComponent,
      canActivate: [AuthGuard]
    },
    {
      path:'detail/:id',
      component:DetailComponent,
      canActivate: [AuthGuard]

    },

    {
      path: '**',
      redirectTo: 'list',
      pathMatch:'full'
    }
  ]
  }

