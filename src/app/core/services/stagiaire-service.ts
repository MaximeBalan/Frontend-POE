import { StagiaireModel } from "../models/stagiaire-model"

const stagiairesTab: any[] = [
    {
        id: 1,
        lastName: 'Aubert',
        firstName: 'Jean-Luc',
        gender: 'M',
        birthDate: new Date(1968, 3, 30),
        phoneNumber: '06 11 11 11 11',
        email: 'jean-luc.aubert@aelion.fr'
    },
    {
        id: 2,
        lastName: 'Weishar',
        firstName: 'Damien',
        gender: 'M',
        birthDate: new Date(1989, 4, 21),
        phoneNumber: '06 06 06 06 06',
        email: 'damienweishar@gmail.com',
    },
    {
        id: 3,
        lastName: 'Bond',
        firstName: 'James',
        birthDate: new Date(1945, 5, 16),
        gender: 'M',
        email: 'james.bond@mi6.co.uk',
        phoneNumber: '00 70 07 00 70'
    },
    {
        id: 4,
        lastName: 'Connor',
        firstName: 'Sarah',
        birthDate: new Date(1979, 4, 4),
        gender: 'F',
        email: 'sara.connor@kill.them.all.com',
        phoneNumber: '05 55 55 55 55'
    }
]

export class StagiaireService {

    private stagiaires: StagiaireModel[] = [];

    //pour récupérer le tableau de StagiaireModel
    public getStagiaires(): StagiaireModel[] {
        return this.stagiaires;
    }

    public findOne(id: number): StagiaireModel | undefined {

        // ma version        
        for (let s of this.stagiaires) {
            if (s.id === id) {
                return s;
            }
        }
        throw new Error('Je ne sais pas comment faire');
        // Option 2 :
        const stagiaire: StagiaireModel | undefined = this.stagiaires.find(
            (inStagiaire: StagiaireModel) => inStagiaire.id === id
        );
        if (stagiaire !== undefined) {
            return stagiaire!;
        }
        throw new Error(`Stagiaire with ${id} was not found`);
    }
    //version 2
    //return this.stagiaires.find(s => s.id === id);
    



    public deserialize(): void {
    stagiairesTab.forEach((anyStagiaire: any) => {
        const stagiaire: StagiaireModel = new StagiaireModel();
        stagiaire.id = anyStagiaire.id;
        stagiaire.lastName = anyStagiaire.lastName;
        stagiaire.firstName = anyStagiaire.firstName;
        stagiaire.birthDate = anyStagiaire.birthDate;
        stagiaire.gender = anyStagiaire.gender;
        stagiaire.phoneNumber = anyStagiaire.phoneNumber;
        stagiaire.email = anyStagiaire.email;

        // Add new stagiaire to the array
        this.stagiaires.push(stagiaire);

    })
}
}
