import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from '../../services/poe/poe.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addPoeForm!: FormGroup; //Groupe de Contrôles de formulaire
  
  constructor(
    private formBuilder: FormBuilder, //permet de construire un formulaire
    private stagiaireService: PoeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addPoeForm = this.formBuilder.group({
      title: [
        '', //Default value (here empty)mais ce n'est pas un placeholder!!!
        
        //tableau pas obligatoire, sauf si on a plusieurs validators !
        [
          Validators.required //le contrôle doit impérativement être défini avec une valeur non nulle
        ]
      ],
      beginDate: [
        '',
        [Validators.required]
      ],
      endDate: [
        '',
        [Validators.required]
      ],
      poeType : [
        '',
        [
          Validators.required,
        ]
      ]
    })        
  }

  public onSubmit(): void {
    console.log(`Values to send : ${JSON.stringify(this.addPoeForm.value)}`);
    this.stagiaireService.create(this.addPoeForm.value)
        .subscribe((poe: Poe)=>{
          console.log("Values received from backend", poe)
          this.router.navigate(['/', 'poes']);
    });

  }

}
