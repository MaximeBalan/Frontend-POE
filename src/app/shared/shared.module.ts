import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '../ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { IntlModule } from '../intl/intl.module';
import { InitialsPipe } from '../stagiaires/pipes/initials.pipe';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';


//sert à regrouper tous les modules dont on a besoin dans les autres modules
//on aura plus qu'à importer ce module, contenant tous les modules mis à disposition pour les autres modules

@NgModule({
  declarations: [
    InitialsPipe
  ],
  imports: [
    CommonModule
    
  ],
  //pour les modules en commun, on les exportera ici
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    UiModule,
    //@TODO move to UiModule
    MatNativeDateModule,
    IntlModule,
    InitialsPipe
  ],
  providers: [
    // MomentDateAdapter can be automatically provided by importing MomentDateModule in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class SharedModule { }
