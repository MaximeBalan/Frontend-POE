import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from '../../services/poe/poe.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public addPoeForm!: FormGroup; //Groupe de Contrôles de formulaire
  public poe: Poe |null = null;
  private id: any;

  constructor(
    private formBuilder: FormBuilder, //permet de construire un formulaire
    private poeService: PoeService,
    private router: Router,
    private route: ActivatedRoute,
    private service: PoeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
        (routeParams) => {
          console.log(`Detail got ${routeParams.get('id')}`); //id est le même nom que dans le path de detail, accessible que dans cette fontion
          this.id = routeParams.get('id');

          try {
            this.service.findOne(+routeParams.get('id')!)
              .subscribe((poe: Poe)=> {
                this.poe = poe;



    this.addPoeForm = this.formBuilder.group({
      title: [
        this.poe.title, //Default value (here empty)mais ce n'est pas un placeholder!!!

        //tableau pas obligatoire, sauf si on a plusieurs validators !
        [
          Validators.required //le contrôle doit impérativement être défini avec une valeur non nulle
        ]
      ],
      beginDate: [
        this.poe.beginDate,
        [Validators.required]
      ],
      endDate: [
        this.poe.endDate,
        [Validators.required]
      ],
      poeType : [
        this.poe.poeType,
        [
          Validators.required,
        ]
      ]
    })
  })
  console.log(JSON.stringify(this.poe));
          } catch (error) {
            this.router.navigate(['/', 'poes']);
             }
        }
      )
  }

  public onSubmit(): void {
    console.log(`Values to send : ${JSON.stringify(this.addPoeForm.value)}`);
    let data = this.addPoeForm.value;
    data.id = this.id;
    this.poeService.update(data)
        .subscribe((poe: Poe)=>{
          console.log("Values received from backend", poe)
          this.router.navigate(['/', 'poes']);
    })

  }
          }


