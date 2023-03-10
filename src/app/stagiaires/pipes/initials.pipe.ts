import { Pipe, PipeTransform } from '@angular/core';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(stagiaire: unknown, full: boolean = false, lastNameFirst: boolean = false, ...args: unknown[]): any {
    if (stagiaire instanceof StagiaireModel) {
      //return JA
      if (full === false && lastNameFirst === false) {
        return (stagiaire.firstName.charAt(0) + stagiaire.lastName.charAt(0));
      }
      //return JLA
      if (full === true && lastNameFirst === false) {
        if(stagiaire.firstName.includes('-')){
          return (stagiaire.firstName.charAt(0) + (stagiaire.firstName.charAt(stagiaire.firstName.search('-') + 1)) + stagiaire.lastName.charAt(0));
        }
        return stagiaire.firstName.charAt(0) + stagiaire.lastName.charAt(0); 
      }
      //return AJ
      if (full === false && lastNameFirst === true) {
        return (stagiaire.lastName.charAt(0) + stagiaire.firstName.charAt(0));
      }
      //return AJL
      if (full === true && lastNameFirst === true) {
        if(stagiaire.firstName.includes('-')){
          return (stagiaire.lastName.charAt(0) + stagiaire.firstName.charAt(0) + (stagiaire.firstName.charAt(stagiaire.firstName.search('-') + 1)));
        }
        return (stagiaire.lastName.charAt(0) + stagiaire.firstName.charAt(0));
      }
    } else {
      throw new Error(`value is not a valid StagiaireModel Object`);
    }
  }
}

//SOLUTION:
/*
export class InitialsPipe implements PipeTransform {

  private _transformParam: string = '';
  private _transformMap: Map<string, Function> = new Map<string, Function>([
    [
      '',
      () => InitialsPipe.simpleInitials()
    ],
    [
      'lastNameFirst',
      () => InitialsPipe.simpleInitialsInversed()
    ],
    [
      'full',
      () => InitialsPipe.simpleFullInitials()
    ],
    [
      'lastNameFirstFull',
      () => InitialsPipe.fullInitialsInversed()
    ]
  ]);
  private static stagiaire: StagiaireModel;

  transform(value: unknown, ...args: string[]): string {
    if (value instanceof StagiaireModel) {
      let dynamicFunction: Function | undefined;

      InitialsPipe.stagiaire = value;
      
      if (args.length) {
        this._transformParam = args[0];
        dynamicFunction = this._transformMap.get(this._transformParam);
        if (dynamicFunction !== undefined) {
          return dynamicFunction();
        } else {
          throw new Error(`Unable to find a resolver Function`);
        }
      } else {
        dynamicFunction = this._transformMap.get('');
        if (dynamicFunction !== undefined)
          return dynamicFunction();
        else
          throw new Error(`Could not load a Function for '' key`);
      }
    } else {
      throw new Error(`value is not a valid StagiaireModel Object`);
    }
  }

  private static simpleInitials(): string {
    return InitialsPipe.stagiaire.firstName.charAt(0) + InitialsPipe.stagiaire.lastName.charAt(0);
  }

  private static simpleInitialsInversed(): string {
    return InitialsPipe.stagiaire.lastName.charAt(0) + InitialsPipe.stagiaire.firstName.charAt(0);
  }

  private static simpleFullInitials(): string {
    let firstNameInitials: string;

    if (InitialsPipe.stagiaire.firstName.includes('-')) {
      firstNameInitials = InitialsPipe.stagiaire.firstName
        .split('-') // Transforme une cha??ne en un tableau en d??coupant la cha??ne sur le caract??re sp??cifi??
        // Si la cha??ne est Jean-Luc => ['Jean', 'Luc']
        .map((firstNamePart: string) => firstNamePart.charAt(0)) // Transforme un tableau en un autre tableau
        // []
        .join(''); // G??n??re une cha??ne ?? partir d'un tableau (inverse du split) => JL
    } else {
      firstNameInitials = InitialsPipe.stagiaire.firstName.charAt(0);
    }
    return firstNameInitials + InitialsPipe.stagiaire.lastName.charAt(0);
  }

  private static fullInitialsInversed(): string {
    let firstNameInitials: string;
    if (InitialsPipe.stagiaire.firstName.includes('-')) {
      firstNameInitials = InitialsPipe.stagiaire.firstName
        .split('-')
        .map((firstNamePart: string) => firstNamePart.charAt(0))
        .join('');
    } else {
      firstNameInitials = InitialsPipe.stagiaire.firstName.charAt(0);
    }
    return InitialsPipe.stagiaire.lastName.charAt(0) + firstNameInitials;
  }
}


*/