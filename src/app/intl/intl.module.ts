import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { intlProvider, IntlService } from './services/intl.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot(
      {
        loader: {
        provide: TranslateLoader,
        useFactory: IntlService.httpLoaderFactory,
        deps: [
          HttpClient
        ]
      }
    }
    ) //pour que le token soit fourni à la racine de l'application
  ],
  exports:[
    TranslateModule
  ],
  providers: [
    intlProvider //on rajoute un fournisseur
  ]
})
export class IntlModule { }
