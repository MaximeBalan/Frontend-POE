import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './stagiaires/list/list.component';
import { DetailComponent } from './stagiaires/detail/detail.component';

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
    redirectTo: 'stagiaires',
    //obligatoire quand il y a un redirectTo
    pathMatch: 'full' //Angular va analyser l'intégralité de la route pour matcher avec le redirectTo
  },
  {
    path:'stagiaires',
    //quand Angular trouve le path, il chargera le component
    component: ListComponent
  },
  {
    path:'detail/:id',
    component:DetailComponent
  
  },
  {
    //TOUJOURS EN DERNIER!!!!!!!
    path:'**', // route fallback
    //pour emmener l'utilisateur qui veut accéder à une route qui n'existe pas pas à une autre route 
    redirectTo:'stagiaires',
    pathMatch: 'full',
  }
];

}
