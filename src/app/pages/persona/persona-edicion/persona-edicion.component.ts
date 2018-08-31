import { PersonaService } from './../../../_service/persona.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../../../_model/persona';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {

  id: number;
  persona: Persona;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private personaService: PersonaService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'pais': new FormControl(''),
      'edad': new FormControl(0)
    });
  }

  ngOnInit() {
    this.persona = new Persona();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.personaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'pais': new FormControl(data.pais),
          'edad': new FormControl(data.edad)
        });
      });
    }
  }

  operar(){
    this.persona.id = this.form.value['id'];
    this.persona.nombres = this.form.value['nombres'];
    this.persona.apellidos = this.form.value['apellidos'];
    this.persona.pais = this.form.value['pais'];
    this.persona.edad = this.form.value['edad'];

    if(this.persona != null && this.persona.id > 0){
      //update
      this.personaService.modificar(this.persona).subscribe( data => {
        console.log(data);
        this.personaService.listar().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('Se modificó');
        });
      });
    }else{
      //insert
      this.personaService.registrar(this.persona).subscribe( data => {
        console.log(data);
        this.personaService.listar().subscribe(data => {
          this.personaService.personaCambio.next(data);
          this.personaService.mensajeCambio.next('Se registró');
        });
      });
    }

    this.router.navigate(['persona']);
  }

}
