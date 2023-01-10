import { APP_INITIALIZER, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntlService {

  constructor() { }

  //méthode qu'on va appeler dès qu'Angular se lance et avant l'affichage
  init(){
    return new Promise<void>((resolve:any)=> {
      console.log(`I'm running`);
      resolve();
     });
  }

  
  public static appInitializer(intlService: IntlService){
    return(): Promise<void> => {
      return intlService.init();
    }
  }
}

//fournisseur du token qui va être greffé et qui va lancer ce dont on veut dès le démarrage de l'application
export const intlProvider = {
  provide: APP_INITIALIZER, //l'application démarre
  useFactory: IntlService.appInitializer, //appel à une fonction qui fait appel à l'init
  deps: [
    //instancie les classes ci-dessous pour ensuite pouvoir les utiliser 
    IntlService 
  ],
  multi:true //autorise à avoir plusieurs services à fournir le token au démarrage de l'application
}