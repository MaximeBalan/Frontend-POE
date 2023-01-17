import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../poes/components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { PoedetailComponent } from './components/poedetail/poedetail.component';
import { UpdateComponent } from './components/update/update.component';

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
      path: 'list/:type', // ce qu'il y a derriere les : sera mis en parametres de l'activated route 
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
      path:'detailPoe/:id',
      component: PoedetailComponent
    },
    {
      path: '**',
      redirectTo: 'list',
      pathMatch:'full'
    }
  ]
}
