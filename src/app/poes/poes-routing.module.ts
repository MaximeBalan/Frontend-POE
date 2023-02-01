import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/helpers/auth.guard';
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
      canActivate: [AuthGuard],
      pathMatch: 'full'
    },
    {
      path: 'list', 
      component: ListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'list/:type', // ce qu'il y a derriere les : sera mis en parametres de l'activated route 
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
      path:'detailPoe/:id',
      component: PoedetailComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: 'list',
      pathMatch:'full'
    }
  ]
}
