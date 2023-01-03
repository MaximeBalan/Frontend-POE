import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';
import { DateLessThan } from 'src/app/core/validators/date-less-than';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addStagiaireForm!: FormGroup; //Groupe de Contrôles de formulaire
  
  constructor(
    private formBuilder: FormBuilder, //permet de construire un formulaire
    private stagiaireService: StagiaireService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addStagiaireForm = this.formBuilder.group({
      lastName: [
        '', //Default value (here empty)mais ce n'est pas un placeholder!!!
        
        //tableau pas obligatoire, sauf si on a plusieurs validators !
        [
          Validators.required //le contrôle doit impérativement être défini avec une valeur non nulle
        ]
      ],
      firstName: [
        '',
        Validators.required
      ],
      gender: [
        'M'
      ],
      birthDate : [
        '',
        [
          Validators.required,
          DateLessThan.dateLessThan()
        ]
      
      ],
      phoneNumber: [
        '',
        [
          Validators.pattern(/^\+(?:[0-9]●?){6,14}[0-9]$/)
        ]
        
      ],
      email : [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ]
      ]
    })        
  }

  public onSubmit(): void {
    console.log(`Values to send : ${JSON.stringify(this.addStagiaireForm.value)}`);
    this.stagiaireService.create(this.addStagiaireForm.value)
        .subscribe((stagiaire: StagiaireModel)=>{
          console.log("Values received from backend", stagiaire)
          this.router.navigate(['/', 'stagiaires']);
          // this.addStagiaireForm.reset();
    });

  }

}
