import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './stagiaires/list/list.component';
import { DetailComponent } from './stagiaires/detail/detail.component';
import { DetailComponent as SurveyDetailComponent} from './surveys/detail/detail.component';
import { ListComponent  as SurveyListComponent} from './surveys/list/list.component';
import { AddComponent } from './stagiaires/add/add.component';
import { UpdateComponent } from './stagiaires/update/update.component';
import { HomeComponent } from './home/home.component';
import { PoedetailComponent } from './poes/components/poedetail/poedetail.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


//comme on est en objet, pas besoin de ce bout de code:
//const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  //static = accès sans besoin d'instancier (cf. plus haut)
public static routes: Routes = [
  {
    path:'', //chemin vide, doit toujours être la 1ère route
    redirectTo: 'home',
    //obligatoire quand il y a un redirectTo
    pathMatch: 'full' //Angular va analyser l'intégralité de la route pour matcher avec le path de l'url
   
  },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  {
  path: 'home',
  canActivate: [AuthGuard],
  component: HomeComponent
  },
  {
    path:'stagiaires',
    canActivate: [AuthGuard],
    //quand Angular trouve le path, il chargera le component
    component: ListComponent
  },
  {
    path:'detail/:id',
    canActivate: [AuthGuard],
    component:DetailComponent
  },
  {
    path:'detailPoe/:id',
    canActivate: [AuthGuard],
    component:PoedetailComponent
  },
  {
    path:'stagiaires/update/:id',
    canActivate: [AuthGuard],
    component:UpdateComponent
  },
  {
    path:'stagiaire/add',
    canActivate: [AuthGuard],
    component:AddComponent
  },
  {
    path:'stagiaire/add/:id',
    canActivate: [AuthGuard],
    component:AddComponent

  },
  {
    path:'survey/detail/:id',
    canActivate: [AuthGuard],
    component:SurveyDetailComponent
  },
  {
    path:'surveys',
    canActivate: [AuthGuard],
    component:SurveyListComponent
  },
  {
    path: 'surveys',
    loadChildren: () => import('./surveys/surveys.module')
    .then((m)=> m.SurveysModule),
  },

  {
    path:'poes',
    loadChildren: () => import('./poes/poes.module')
    .then((m)=> m.PoesModule),
  },
  {
    //TOUJOURS EN DERNIER!!!!!!!
    path:'**', // route fallback
    //pour emmener l'utilisateur qui veut accéder à une route qui n'existe pas par à une autre route
    redirectTo:'home',
    pathMatch: 'full',
  }


];

}
