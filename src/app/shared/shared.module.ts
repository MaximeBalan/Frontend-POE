import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


//sert à regrouper tous les modules dont on a besoin dans les autres modules
//on aura plus qu'à importer ce module, contenant tous les modules mis à disposition pour les autres modules

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  //pour les modules en commun, on les exportera ici
  exports: [
    HttpClientModule
  ]
})
export class SharedModule { }
