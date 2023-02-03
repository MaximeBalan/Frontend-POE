import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Poe } from 'src/app/core/models/poe';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';
import { DateLessThan } from 'src/app/core/validators/date-less-than';
import { PoeService } from 'src/app/poes/services/poe/poe.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public stagiaire: StagiaireModel |null = null;
  public addStagiaireForm!: FormGroup; //Groupe de Contrôles de formulaire
  private id: any; // pour recup id dans onsubmit
  
  constructor(
    private formBuilder: FormBuilder, //permet de construire un formulaire
    private stagiaireService: StagiaireService,
    private router: Router,
    private route: ActivatedRoute,
    private service: StagiaireService,
  ) { }

  ngOnInit(): void {
      //pour récupérer des détails/données d'une autre page
      this.route.paramMap.subscribe(
        (routeParams) => {
          console.log(`Detail got ${routeParams.get('id')}`); //id est le même nom que dans le path de detail, accessible que dans cette fontion
          this.id = routeParams.get('id');

          try {
            this.service.findOne(+routeParams.get('id')!)
              .subscribe((stagiaire: StagiaireModel)=> {
                this.stagiaire = stagiaire;

                // Here comes the Trainee
                this.addStagiaireForm = this.formBuilder.group({
                  lastName: [
                    this.stagiaire.lastName, //Default value (here empty)mais ce n'est pas un placeholder!!!

                    //tableau pas obligatoire, sauf si on a plusieurs validators !
                    [
                      Validators.required //le contrôle doit impérativement être défini avec une valeur non nulle
                    ]
                  ],
                  firstName: [
                    this.stagiaire.firstName,
                    Validators.required
                  ],
                  gender: [
                    this.stagiaire.gender
                  ],
                  birthDate : [
                    this.stagiaire.birthDate,
                    [
                      Validators.required,
                      DateLessThan.dateLessThan()
                    ]

                  ],
                  phoneNumber: [
                    this.stagiaire.phoneNumber,
                    [
                      Validators.pattern(/^\+(?:[0-9]●?){6,14}[0-9]$/)
                    ]

                  ],
                  email : [
                    this.stagiaire.email,
                    [
                      Validators.required,
                      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
                    ]
                  ]
                })
              })
            console.log(JSON.stringify(this.stagiaire));
          } catch (error) {
            this.router.navigate(['/', 'stagiaires']);

          }
        }
      )
  }

  public onSubmit(): void {
    console.log(`Values to send : ${JSON.stringify(this.addStagiaireForm.value)}`);
    let data = this.addStagiaireForm.value;
    data.id = this.id;
    this.stagiaireService.update(data)
        .subscribe((stagiaire: StagiaireModel)=>{
          console.log("Values received from backend", stagiaire)
          this.router.navigate(['/', 'home']);
          // this.addStagiaireForm.reset();
    });
  }
}

