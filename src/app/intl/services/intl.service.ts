import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntlService {
  private _language: string = '';
  private _translateService!:TranslateService;
  constructor() { }

  get language(): string{
    return this._language
  }
  set language(language: string){
    this._language = language;
    this._switchLanguage();
  }

  //méthode qu'on va appeler dès qu'Angular se lance et avant l'affichage
  //pour charger les sources qu'Angular va utiliser
  init(translateService: TranslateService, injector: Injector){
    return new Promise<void>((resolve:any)=> {
      injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve(null) //if TOKEN was not provided
      ).then(()=>{ // Angular says "Iim ok with my own ressources, do what you need"
        const userLanguage: string = window.navigator.language.split('-')[0]; // fr-FR => fr | FR => fr
        this._language = /(fr|en|de|it|es)/gi.test(userLanguage) ? userLanguage : 'fr';

        this._translateService = translateService;

        this._switchLanguage().subscribe(()=> {
          console.log(`Location was loaded for ${this._language}!!`);
          resolve();
        })       
      })
    });
  }

  private _switchLanguage(): Observable<any>{
    return this._translateService.use(this._language);
  }
  
  public static appInitializer(
    //même ordre que dans les deps de intlProvider
    intlService: IntlService,
    translateService: TranslateService,
    injector: Injector
    ){
    return(): Promise<void> => {
      return intlService.init(translateService, injector);
    }
  }

  //récupère tous les fichiers dans i18n avec l'extension par .json
  public static httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader { 
    return new TranslateHttpLoader( 
      httpClient, 
      './assets/i18n/', 
      '.json' ); 
  }
}

//fournisseur du token qui va être greffé et qui va lancer ce dont on veut dès le démarrage de l'application
export const intlProvider = {
  provide: APP_INITIALIZER, //l'application démarre
  useFactory: IntlService.appInitializer, //appel à une fonction qui fait appel à l'init
  deps: [
    //instancie les classes ci-dessous pour ensuite pouvoir les utiliser 
    IntlService,
    TranslateService,
    Injector
  ],
  multi:true //autorise à avoir plusieurs services à fournir le token au démarrage de l'application
}