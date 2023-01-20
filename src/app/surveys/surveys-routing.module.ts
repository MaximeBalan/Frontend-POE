import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
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
      pathMatch: 'full'
    },
    {
      path: 'list',
      component: ListComponent
    },

    {
      path:'add',
      component: AddComponent
    },

    {
      path:'update/:id',
      component: UpdateComponent
    },

    {
      path: '**',
      redirectTo: 'list',
      pathMatch:'full'
    }
  ]
  }

