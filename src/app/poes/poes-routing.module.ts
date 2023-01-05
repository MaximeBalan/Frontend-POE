import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../poes/components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { ManageComponent } from './components/manage/manage.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(PoesRoutingModule.routes)],
  exports: [RouterModule]
})
export class PoesRoutingModule { 
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
    },{
      path:'update/id',
      component: ManageComponent
    },
    {
      path: '**',
      redirectTo: 'list',
      pathMatch:'full'
    }
  ]
}
